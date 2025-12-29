export interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  DB: D1Database;
  PHOTOS: R2Bucket;
}

// Allowed admin emails
const ALLOWED_ADMINS = [
  'manojthomas@berkeley.edu',
  'neilthomas@berkeley.edu',
  'manojthomas@gmail.com',
  'nathanthomas707@gmail.com'
];

// Configuration
const OTP_EXPIRY_MINUTES = 5;
const SESSION_EXPIRY_DAYS = 7;
const OTP_LENGTH = 6;

// Allowed CORS origins
const ALLOWED_ORIGINS = [
  'https://cascadecaliforniarealty.com',
  'https://www.cascadecaliforniarealty.com',
  'http://localhost:5173',
  'http://localhost:4173',
];

// Types
interface OTPRequest {
  email: string;
}

interface OTPVerify {
  email: string;
  code: string;
}

interface TestimonialUpdate {
  testimonial_text?: string;
  status?: 'pending' | 'approved' | 'rejected';
  display_type?: string;
  display_price?: string;
  photo?: string | null; // Base64 encoded image or null to remove
}

interface TestimonialCreate {
  name: string;
  email?: string;
  property_address: string;
  testimonial_text: string;
  display_type?: string;
  display_price?: string;
  status?: 'pending' | 'approved';
  photo?: string; // Base64 encoded image
}

interface AgentBio {
  name: string;
  title?: string;
  photo_url?: string;
  bio_text?: string;
  email?: string;
  phone?: string;
  certifications?: string[];
  specialties?: string[];
  years_experience?: number;
  social_links?: Record<string, string>;
  languages?: string[];
  areas_served?: string[];
  education?: string[];
  awards?: string[];
  display_order?: number;
  is_active?: boolean;
  lifetime_sales?: string;
  avg_sale_price?: string;
  clients_count?: number;
}

// Utility functions
function generateOTP(): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

function generateSessionToken(): string {
  return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
}

function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';
  return ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
}

function jsonResponse(data: object, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

function errorResponse(code: string, message: string, status: number): Response {
  return jsonResponse({ success: false, error: { code, message } }, status);
}

function successResponse(data: object, status: number = 200, headers: Record<string, string> = {}): Response {
  return jsonResponse({ success: true, data }, status, headers);
}

function addCorsHeaders(response: Response, origin: string): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', origin);
  newHeaders.set('Access-Control-Allow-Credentials', 'true');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

function getCookieValue(request: Request, name: string): string | null {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return null;

  const match = cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setSessionCookie(token: string, maxAge: number): string {
  return `admin_session=${token}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${maxAge}`;
}

function clearSessionCookie(): string {
  return 'admin_session=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0';
}

// Auth middleware
async function getAuthenticatedUser(request: Request, env: Env): Promise<string | null> {
  const token = getCookieValue(request, 'admin_session');
  if (!token) return null;

  const session = await env.DB.prepare(
    `SELECT email, expires_at FROM admin_sessions
     WHERE token = ? AND datetime(expires_at) > datetime('now')`
  ).bind(token).first<{ email: string; expires_at: string }>();

  return session?.email || null;
}

// Send OTP email
async function sendOTPEmail(env: Env, email: string, code: string): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
  <div style="max-width: 400px; margin: 0 auto; background: white; border: 1px solid #e5e7eb;">
    <div style="padding: 32px; text-align: center;">
      <h1 style="font-size: 24px; font-weight: 300; color: #111827; margin: 0 0 8px 0;">Admin Login</h1>
      <p style="color: #6b7280; margin: 0 0 32px 0;">Your verification code for Cascade California Realty admin panel.</p>

      <div style="background: #f9fafb; padding: 24px; margin: 24px 0;">
        <p style="font-size: 36px; font-weight: 600; letter-spacing: 0.3em; color: #111827; margin: 0;">${code}</p>
      </div>

      <p style="color: #9ca3af; font-size: 12px; margin: 24px 0 0 0;">
        This code expires in ${OTP_EXPIRY_MINUTES} minutes.<br>
        If you didn't request this code, please ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Cascade Realtors <${env.FROM_EMAIL}>`,
        to: [email],
        subject: `Your admin login code: ${code}`,
        html: htmlContent,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return false;
  }
}

// Route handlers
async function handleRequestOTP(request: Request, env: Env): Promise<Response> {
  try {
    const body: OTPRequest = await request.json();
    const email = body.email?.toLowerCase().trim();

    if (!email) {
      return errorResponse('MISSING_EMAIL', 'Email is required.', 400);
    }

    // Always return success message (don't leak which emails are valid)
    const genericResponse = successResponse({
      message: 'If this email is registered as an admin, you will receive a verification code.'
    });

    // Check if email is allowed
    if (!ALLOWED_ADMINS.includes(email)) {
      return genericResponse;
    }

    // Generate OTP
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();

    // Mark any existing unused codes as used
    await env.DB.prepare(
      `UPDATE admin_otp_codes SET used = 1 WHERE email = ? AND used = 0`
    ).bind(email).run();

    // Insert new OTP
    await env.DB.prepare(
      `INSERT INTO admin_otp_codes (email, code, expires_at) VALUES (?, ?, ?)`
    ).bind(email, code, expiresAt).run();

    // Send email
    await sendOTPEmail(env, email, code);

    return genericResponse;
  } catch (error) {
    console.error('Request OTP error:', error);
    return errorResponse('SERVER_ERROR', 'An error occurred. Please try again.', 500);
  }
}

async function handleVerifyOTP(request: Request, env: Env): Promise<Response> {
  try {
    const body: OTPVerify = await request.json();
    const email = body.email?.toLowerCase().trim();
    const code = body.code?.trim();

    if (!email || !code) {
      return errorResponse('MISSING_FIELDS', 'Email and code are required.', 400);
    }

    // Find valid OTP
    const otp = await env.DB.prepare(
      `SELECT id FROM admin_otp_codes
       WHERE email = ? AND code = ? AND used = 0 AND datetime(expires_at) > datetime('now')
       ORDER BY created_at DESC LIMIT 1`
    ).bind(email, code).first<{ id: number }>();

    if (!otp) {
      return errorResponse('INVALID_OTP', 'The verification code is invalid or has expired.', 401);
    }

    // Mark OTP as used
    await env.DB.prepare(
      `UPDATE admin_otp_codes SET used = 1 WHERE id = ?`
    ).bind(otp.id).run();

    // Create session
    const token = generateSessionToken();
    const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000).toISOString();

    await env.DB.prepare(
      `INSERT INTO admin_sessions (email, token, expires_at) VALUES (?, ?, ?)`
    ).bind(email, token, expiresAt).run();

    return successResponse(
      { email, message: 'Login successful.' },
      200,
      { 'Set-Cookie': setSessionCookie(token, SESSION_EXPIRY_DAYS * 24 * 60 * 60) }
    );
  } catch (error) {
    console.error('Verify OTP error:', error);
    return errorResponse('SERVER_ERROR', 'An error occurred. Please try again.', 500);
  }
}

async function handleLogout(request: Request, env: Env): Promise<Response> {
  const token = getCookieValue(request, 'admin_session');

  if (token) {
    await env.DB.prepare(
      `DELETE FROM admin_sessions WHERE token = ?`
    ).bind(token).run();
  }

  return successResponse(
    { message: 'Logged out successfully.' },
    200,
    { 'Set-Cookie': clearSessionCookie() }
  );
}

async function handleGetMe(request: Request, env: Env): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);

  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  return successResponse({ email });
}

// Testimonials handlers
async function handleGetTestimonials(request: Request, env: Env): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const page = parseInt(url.searchParams.get('page') || '1');
  const perPage = parseInt(url.searchParams.get('perPage') || '20');
  const offset = (page - 1) * perPage;

  let whereClause = '';
  const params: (string | number)[] = [];

  if (status && ['pending', 'approved', 'rejected'].includes(status)) {
    whereClause = 'WHERE status = ?';
    params.push(status);
  }

  // Get total count
  const countResult = await env.DB.prepare(
    `SELECT COUNT(*) as count FROM testimonials ${whereClause}`
  ).bind(...params).first<{ count: number }>();

  const total = countResult?.count || 0;

  // Get testimonials
  const testimonials = await env.DB.prepare(
    `SELECT id, name, email, property_address, testimonial_text, photo_url,
            submitted_at, status, display_type, display_price, approved_at
     FROM testimonials ${whereClause}
     ORDER BY submitted_at DESC
     LIMIT ? OFFSET ?`
  ).bind(...params, perPage, offset).all();

  // Convert photo keys to full URLs (preserve local paths and full URLs)
  const items = testimonials.results.map((t: Record<string, unknown>) => {
    const photoUrl = t.photo_url as string | null;
    let finalPhotoUrl: string | null = null;
    if (photoUrl) {
      // Preserve local paths (start with /) and full URLs (start with http)
      if (photoUrl.startsWith('/') || photoUrl.startsWith('http')) {
        finalPhotoUrl = photoUrl;
      } else {
        // R2 key - convert to worker URL
        finalPhotoUrl = `https://cascade-testimonials.manoj-thomas-c22.workers.dev/photo/${encodeURIComponent(photoUrl)}`;
      }
    }
    return { ...t, photo_url: finalPhotoUrl };
  });

  return successResponse({
    items,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage)
    }
  });
}

async function handleUpdateTestimonial(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    const body: TestimonialUpdate = await request.json();

    // Build update query dynamically
    const updates: string[] = [];
    const params: (string | number | null)[] = [];

    if (body.testimonial_text !== undefined) {
      updates.push('testimonial_text = ?');
      params.push(body.testimonial_text);
    }
    if (body.status !== undefined) {
      updates.push('status = ?');
      params.push(body.status);
      if (body.status === 'approved') {
        updates.push("approved_at = datetime('now')");
      }
    }
    if (body.display_type !== undefined) {
      updates.push('display_type = ?');
      params.push(body.display_type);
    }
    if (body.display_price !== undefined) {
      updates.push('display_price = ?');
      params.push(body.display_price);
    }

    // Handle photo update
    if (body.photo !== undefined) {
      // Get current photo to potentially delete
      const currentTestimonial = await env.DB.prepare(
        `SELECT photo_url FROM testimonials WHERE id = ?`
      ).bind(id).first<{ photo_url: string | null }>();

      // Delete old photo from R2 if it's an R2 key (not a local path)
      if (currentTestimonial?.photo_url &&
          !currentTestimonial.photo_url.startsWith('/') &&
          !currentTestimonial.photo_url.startsWith('http')) {
        try {
          await env.PHOTOS.delete(currentTestimonial.photo_url);
        } catch (e) {
          console.error('Failed to delete old photo:', e);
        }
      }

      if (body.photo === null) {
        // Remove photo
        updates.push('photo_url = ?');
        params.push(null);
      } else if (body.photo) {
        // Upload new photo
        const matches = body.photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          return errorResponse('INVALID_FORMAT', 'Invalid photo format.', 400);
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(mimeType)) {
          return errorResponse('INVALID_TYPE', 'Only JPEG, PNG, and WebP images are allowed.', 400);
        }

        const MAX_SIZE = 5 * 1024 * 1024;
        const estimatedSize = Math.ceil((base64Data.length * 3) / 4);
        if (estimatedSize > MAX_SIZE) {
          return errorResponse('FILE_TOO_LARGE', 'Photo must be under 5MB.', 400);
        }

        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const extension = mimeType.split('/')[1] || 'jpg';
        const filename = `testimonials/${Date.now()}-${crypto.randomUUID()}.${extension}`;

        await env.PHOTOS.put(filename, bytes, {
          httpMetadata: { contentType: mimeType },
        });

        updates.push('photo_url = ?');
        params.push(filename);
      }
    }

    if (updates.length === 0) {
      return errorResponse('NO_UPDATES', 'No fields to update.', 400);
    }

    params.push(id);

    await env.DB.prepare(
      `UPDATE testimonials SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run();

    return successResponse({ message: 'Testimonial updated successfully.' });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to update testimonial.', 500);
  }
}

async function handleDeleteTestimonial(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    // Get the testimonial to check for photo
    const testimonial = await env.DB.prepare(
      `SELECT photo_url FROM testimonials WHERE id = ?`
    ).bind(id).first<{ photo_url: string | null }>();

    if (!testimonial) {
      return errorResponse('NOT_FOUND', 'Testimonial not found.', 404);
    }

    // Delete photo from R2 if exists
    if (testimonial.photo_url) {
      try {
        await env.PHOTOS.delete(testimonial.photo_url);
      } catch (e) {
        console.error('Failed to delete photo:', e);
      }
    }

    // Delete from database
    await env.DB.prepare(
      `DELETE FROM testimonials WHERE id = ?`
    ).bind(id).run();

    return successResponse({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to delete testimonial.', 500);
  }
}

async function handleCreateTestimonial(request: Request, env: Env): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    const body: TestimonialCreate = await request.json();

    if (!body.name || !body.property_address || !body.testimonial_text) {
      return errorResponse('MISSING_FIELDS', 'Name, property address, and testimonial text are required.', 400);
    }

    // Handle photo upload if provided
    let photoUrl: string | null = null;
    if (body.photo) {
      const matches = body.photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return errorResponse('INVALID_FORMAT', 'Invalid photo format.', 400);
      }

      const mimeType = matches[1];
      const base64Data = matches[2];

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(mimeType)) {
        return errorResponse('INVALID_TYPE', 'Only JPEG, PNG, and WebP images are allowed.', 400);
      }

      const MAX_SIZE = 5 * 1024 * 1024;
      const estimatedSize = Math.ceil((base64Data.length * 3) / 4);
      if (estimatedSize > MAX_SIZE) {
        return errorResponse('FILE_TOO_LARGE', 'Photo must be under 5MB.', 400);
      }

      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const extension = mimeType.split('/')[1] || 'jpg';
      const filename = `testimonials/${Date.now()}-${crypto.randomUUID()}.${extension}`;

      await env.PHOTOS.put(filename, bytes, {
        httpMetadata: { contentType: mimeType },
      });

      photoUrl = filename;
    }

    const status = body.status || 'approved';
    const adminToken = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');

    const result = await env.DB.prepare(
      `INSERT INTO testimonials (name, email, property_address, testimonial_text, photo_url, display_type, display_price, status, admin_token, approved_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ${status === 'approved' ? "datetime('now')" : 'NULL'})`
    ).bind(
      body.name,
      body.email || '',
      body.property_address,
      body.testimonial_text,
      photoUrl,
      body.display_type || null,
      body.display_price || null,
      status,
      adminToken
    ).run();

    return successResponse({
      id: result.meta.last_row_id,
      message: 'Testimonial created successfully.'
    }, 201);
  } catch (error) {
    console.error('Create testimonial error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to create testimonial.', 500);
  }
}

// Agent handlers
async function handleGetAgents(request: Request, env: Env): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  const agents = await env.DB.prepare(
    `SELECT * FROM agent_bios ORDER BY display_order ASC, created_at ASC`
  ).all();

  // Parse JSON fields
  const items = agents.results.map((a: Record<string, unknown>) => ({
    ...a,
    certifications: a.certifications ? JSON.parse(a.certifications as string) : [],
    specialties: a.specialties ? JSON.parse(a.specialties as string) : [],
    social_links: a.social_links ? JSON.parse(a.social_links as string) : {},
    languages: a.languages ? JSON.parse(a.languages as string) : [],
    areas_served: a.areas_served ? JSON.parse(a.areas_served as string) : [],
    education: a.education ? JSON.parse(a.education as string) : [],
    awards: a.awards ? JSON.parse(a.awards as string) : [],
    is_active: Boolean(a.is_active),
  }));

  return successResponse({ items });
}

async function handleGetAgent(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  const agent = await env.DB.prepare(
    `SELECT * FROM agent_bios WHERE id = ?`
  ).bind(id).first();

  if (!agent) {
    return errorResponse('NOT_FOUND', 'Agent not found.', 404);
  }

  // Parse JSON fields
  const item = {
    ...agent,
    certifications: agent.certifications ? JSON.parse(agent.certifications as string) : [],
    specialties: agent.specialties ? JSON.parse(agent.specialties as string) : [],
    social_links: agent.social_links ? JSON.parse(agent.social_links as string) : {},
    languages: agent.languages ? JSON.parse(agent.languages as string) : [],
    areas_served: agent.areas_served ? JSON.parse(agent.areas_served as string) : [],
    education: agent.education ? JSON.parse(agent.education as string) : [],
    awards: agent.awards ? JSON.parse(agent.awards as string) : [],
    is_active: Boolean(agent.is_active),
  };

  return successResponse({ item });
}

async function handleCreateAgent(request: Request, env: Env): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    const body: AgentBio = await request.json();

    if (!body.name) {
      return errorResponse('MISSING_NAME', 'Agent name is required.', 400);
    }

    const result = await env.DB.prepare(
      `INSERT INTO agent_bios (
        name, title, bio_text, email, phone,
        certifications, specialties, years_experience, social_links,
        languages, areas_served, education, awards, display_order, is_active,
        lifetime_sales, avg_sale_price, clients_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      body.name,
      body.title || null,
      body.bio_text || null,
      body.email || null,
      body.phone || null,
      body.certifications ? JSON.stringify(body.certifications) : null,
      body.specialties ? JSON.stringify(body.specialties) : null,
      body.years_experience || null,
      body.social_links ? JSON.stringify(body.social_links) : null,
      body.languages ? JSON.stringify(body.languages) : null,
      body.areas_served ? JSON.stringify(body.areas_served) : null,
      body.education ? JSON.stringify(body.education) : null,
      body.awards ? JSON.stringify(body.awards) : null,
      body.display_order || 0,
      body.is_active !== false ? 1 : 0,
      body.lifetime_sales || null,
      body.avg_sale_price || null,
      body.clients_count || null
    ).run();

    return successResponse({
      id: result.meta.last_row_id,
      message: 'Agent created successfully.'
    }, 201);
  } catch (error) {
    console.error('Create agent error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to create agent.', 500);
  }
}

async function handleUpdateAgent(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    const body: AgentBio = await request.json();

    const updates: string[] = [];
    const params: (string | number | null)[] = [];

    if (body.name !== undefined) {
      updates.push('name = ?');
      params.push(body.name);
    }
    if (body.title !== undefined) {
      updates.push('title = ?');
      params.push(body.title || null);
    }
    if (body.bio_text !== undefined) {
      updates.push('bio_text = ?');
      params.push(body.bio_text || null);
    }
    if (body.email !== undefined) {
      updates.push('email = ?');
      params.push(body.email || null);
    }
    if (body.phone !== undefined) {
      updates.push('phone = ?');
      params.push(body.phone || null);
    }
    if (body.certifications !== undefined) {
      updates.push('certifications = ?');
      params.push(JSON.stringify(body.certifications));
    }
    if (body.specialties !== undefined) {
      updates.push('specialties = ?');
      params.push(JSON.stringify(body.specialties));
    }
    if (body.years_experience !== undefined) {
      updates.push('years_experience = ?');
      params.push(body.years_experience);
    }
    if (body.social_links !== undefined) {
      updates.push('social_links = ?');
      params.push(JSON.stringify(body.social_links));
    }
    if (body.languages !== undefined) {
      updates.push('languages = ?');
      params.push(JSON.stringify(body.languages));
    }
    if (body.areas_served !== undefined) {
      updates.push('areas_served = ?');
      params.push(JSON.stringify(body.areas_served));
    }
    if (body.education !== undefined) {
      updates.push('education = ?');
      params.push(JSON.stringify(body.education));
    }
    if (body.awards !== undefined) {
      updates.push('awards = ?');
      params.push(JSON.stringify(body.awards));
    }
    if (body.display_order !== undefined) {
      updates.push('display_order = ?');
      params.push(body.display_order);
    }
    if (body.is_active !== undefined) {
      updates.push('is_active = ?');
      params.push(body.is_active ? 1 : 0);
    }
    if (body.photo_url !== undefined) {
      updates.push('photo_url = ?');
      params.push(body.photo_url || null);
    }
    if (body.lifetime_sales !== undefined) {
      updates.push('lifetime_sales = ?');
      params.push(body.lifetime_sales || null);
    }
    if (body.avg_sale_price !== undefined) {
      updates.push('avg_sale_price = ?');
      params.push(body.avg_sale_price || null);
    }
    if (body.clients_count !== undefined) {
      updates.push('clients_count = ?');
      params.push(body.clients_count || null);
    }

    if (updates.length === 0) {
      return errorResponse('NO_UPDATES', 'No fields to update.', 400);
    }

    updates.push("updated_at = datetime('now')");
    params.push(id);

    await env.DB.prepare(
      `UPDATE agent_bios SET ${updates.join(', ')} WHERE id = ?`
    ).bind(...params).run();

    return successResponse({ message: 'Agent updated successfully.' });
  } catch (error) {
    console.error('Update agent error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to update agent.', 500);
  }
}

async function handleDeleteAgent(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    // Get agent to check for photo
    const agent = await env.DB.prepare(
      `SELECT photo_url FROM agent_bios WHERE id = ?`
    ).bind(id).first<{ photo_url: string | null }>();

    if (!agent) {
      return errorResponse('NOT_FOUND', 'Agent not found.', 404);
    }

    // Delete photo from R2 if exists
    if (agent.photo_url) {
      try {
        await env.PHOTOS.delete(agent.photo_url);
      } catch (e) {
        console.error('Failed to delete photo:', e);
      }
    }

    await env.DB.prepare(
      `DELETE FROM agent_bios WHERE id = ?`
    ).bind(id).run();

    return successResponse({ message: 'Agent deleted successfully.' });
  } catch (error) {
    console.error('Delete agent error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to delete agent.', 500);
  }
}

async function handleAgentPhotoUpload(request: Request, env: Env, id: string): Promise<Response> {
  const email = await getAuthenticatedUser(request, env);
  if (!email) {
    return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
  }

  try {
    const body: { photo: string } = await request.json();

    if (!body.photo) {
      return errorResponse('MISSING_PHOTO', 'Photo is required.', 400);
    }

    // Validate and upload photo
    const matches = body.photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return errorResponse('INVALID_FORMAT', 'Invalid photo format.', 400);
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(mimeType)) {
      return errorResponse('INVALID_TYPE', 'Only JPEG, PNG, and WebP images are allowed.', 400);
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    const estimatedSize = Math.ceil((base64Data.length * 3) / 4);
    if (estimatedSize > MAX_SIZE) {
      return errorResponse('FILE_TOO_LARGE', 'Photo must be under 5MB.', 400);
    }

    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Get current photo to delete
    const agent = await env.DB.prepare(
      `SELECT photo_url FROM agent_bios WHERE id = ?`
    ).bind(id).first<{ photo_url: string | null }>();

    if (!agent) {
      return errorResponse('NOT_FOUND', 'Agent not found.', 404);
    }

    // Delete old photo if exists
    if (agent.photo_url) {
      try {
        await env.PHOTOS.delete(agent.photo_url);
      } catch (e) {
        console.error('Failed to delete old photo:', e);
      }
    }

    // Upload new photo
    const extension = mimeType.split('/')[1] || 'jpg';
    const filename = `agents/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    await env.PHOTOS.put(filename, bytes, {
      httpMetadata: { contentType: mimeType },
    });

    // Update database
    await env.DB.prepare(
      `UPDATE agent_bios SET photo_url = ?, updated_at = datetime('now') WHERE id = ?`
    ).bind(filename, id).run();

    return successResponse({
      photo_url: filename,
      message: 'Photo uploaded successfully.'
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return errorResponse('SERVER_ERROR', 'Failed to upload photo.', 500);
  }
}

// Public endpoint to get active agents (no auth required)
async function handleGetPublicAgents(request: Request, env: Env): Promise<Response> {
  try {
    const agents = await env.DB.prepare(
      `SELECT * FROM agent_bios WHERE is_active = 1 ORDER BY display_order ASC, created_at ASC`
    ).all();

    // Parse JSON fields and build photo URLs
    const items = agents.results.map((a: Record<string, unknown>) => {
      const photoUrl = a.photo_url as string | null;
      let finalPhotoUrl: string | null = null;
      if (photoUrl) {
        if (photoUrl.startsWith('/') || photoUrl.startsWith('http')) {
          finalPhotoUrl = photoUrl;
        } else {
          finalPhotoUrl = `https://cascade-admin.manoj-thomas-c22.workers.dev/photo/${encodeURIComponent(photoUrl)}`;
        }
      }

      return {
        id: a.id,
        name: a.name,
        title: a.title,
        photo_url: finalPhotoUrl,
        bio_text: a.bio_text,
        email: a.email,
        phone: a.phone,
        certifications: a.certifications ? JSON.parse(a.certifications as string) : [],
        specialties: a.specialties ? JSON.parse(a.specialties as string) : [],
        years_experience: a.years_experience,
        social_links: a.social_links ? JSON.parse(a.social_links as string) : {},
        languages: a.languages ? JSON.parse(a.languages as string) : [],
        areas_served: a.areas_served ? JSON.parse(a.areas_served as string) : [],
        education: a.education ? JSON.parse(a.education as string) : [],
        awards: a.awards ? JSON.parse(a.awards as string) : [],
        lifetime_sales: a.lifetime_sales,
        avg_sale_price: a.avg_sale_price,
        clients_count: a.clients_count,
      };
    });

    return successResponse({ agents: items });
  } catch (error) {
    console.error('Error fetching public agents:', error);
    return errorResponse('SERVER_ERROR', 'Failed to fetch agents.', 500);
  }
}

// Serve agent photos
async function handleGetAgentPhoto(request: Request, env: Env, key: string): Promise<Response> {
  if (!key || !key.startsWith('agents/')) {
    return new Response('Invalid photo key', { status: 400 });
  }

  try {
    const object = await env.PHOTOS.get(key);

    if (!object) {
      return new Response('Photo not found', { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(object.body, { headers });
  } catch (error) {
    console.error('Error fetching photo:', error);
    return new Response('Failed to fetch photo', { status: 500 });
  }
}

// Main router
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const origin = getCorsOrigin(request);

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    let response: Response;

    // Auth routes
    if (path === '/auth/request-otp' && method === 'POST') {
      response = await handleRequestOTP(request, env);
    } else if (path === '/auth/verify-otp' && method === 'POST') {
      response = await handleVerifyOTP(request, env);
    } else if (path === '/auth/logout' && method === 'POST') {
      response = await handleLogout(request, env);
    } else if (path === '/auth/me' && method === 'GET') {
      response = await handleGetMe(request, env);
    }
    // Testimonials routes
    else if (path === '/testimonials' && method === 'GET') {
      response = await handleGetTestimonials(request, env);
    } else if (path === '/testimonials' && method === 'POST') {
      response = await handleCreateTestimonial(request, env);
    } else if (path.match(/^\/testimonials\/\d+$/) && method === 'PUT') {
      const id = path.split('/')[2];
      response = await handleUpdateTestimonial(request, env, id);
    } else if (path.match(/^\/testimonials\/\d+$/) && method === 'DELETE') {
      const id = path.split('/')[2];
      response = await handleDeleteTestimonial(request, env, id);
    }
    // Public agents endpoint (no auth required)
    else if (path === '/agents/public' && method === 'GET') {
      response = await handleGetPublicAgents(request, env);
    }
    // Agents routes (auth required)
    else if (path === '/agents' && method === 'GET') {
      response = await handleGetAgents(request, env);
    } else if (path === '/agents' && method === 'POST') {
      response = await handleCreateAgent(request, env);
    } else if (path.match(/^\/agents\/\d+$/) && method === 'GET') {
      const id = path.split('/')[2];
      response = await handleGetAgent(request, env, id);
    } else if (path.match(/^\/agents\/\d+$/) && method === 'PUT') {
      const id = path.split('/')[2];
      response = await handleUpdateAgent(request, env, id);
    } else if (path.match(/^\/agents\/\d+$/) && method === 'DELETE') {
      const id = path.split('/')[2];
      response = await handleDeleteAgent(request, env, id);
    } else if (path.match(/^\/agents\/\d+\/photo$/) && method === 'POST') {
      const id = path.split('/')[2];
      response = await handleAgentPhotoUpload(request, env, id);
    }
    // Serve agent photos
    else if (path.startsWith('/photo/') && method === 'GET') {
      const key = decodeURIComponent(path.slice(7));
      response = await handleGetAgentPhoto(request, env, key);
    } else {
      response = new Response('Not found', { status: 404 });
    }

    // Add CORS headers to all responses
    return addCorsHeaders(response, origin);
  },
};
