export interface Env {
  RESEND_API_KEY: string;
  ADMIN_EMAIL: string;
  FROM_EMAIL: string;
  DB: D1Database;
  PHOTOS: R2Bucket;
}

interface TestimonialSubmission {
  name: string;
  email: string;
  propertyAddress: string;
  testimonialText: string;
  photo?: string; // Base64 encoded image
}

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) return false;

  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) return false;
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('-')) return false;

  return true;
}

function jsonResponse(data: object, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

function htmlResponse(html: string, status: number = 200): Response {
  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

function generateToken(): string {
  return crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
}

async function uploadPhotoToR2(bucket: R2Bucket, base64Photo: string): Promise<string> {
  const matches = base64Photo.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid photo format');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(mimeType)) {
    throw new Error('Invalid image type. Only JPEG, PNG, and WebP are allowed.');
  }

  // Estimate decoded size (base64 is ~4/3 of original size)
  const estimatedSize = Math.ceil((base64Data.length * 3) / 4);
  if (estimatedSize > MAX_PHOTO_SIZE) {
    throw new Error('Photo must be under 5MB');
  }

  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Double-check actual size after decoding
  if (bytes.length > MAX_PHOTO_SIZE) {
    throw new Error('Photo must be under 5MB');
  }

  const extension = mimeType.split('/')[1] || 'jpg';
  const filename = `testimonials/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  await bucket.put(filename, bytes, {
    httpMetadata: { contentType: mimeType },
  });

  return filename;
}

async function sendAdminNotification(
  env: Env,
  data: TestimonialSubmission,
  testimonialId: number,
  adminToken: string,
  photoKey: string | null,
  workerUrl: string
): Promise<void> {
  const approveUrl = `${workerUrl}/approve?id=${testimonialId}&token=${adminToken}`;
  const rejectUrl = `${workerUrl}/reject?id=${testimonialId}&token=${adminToken}`;

  // Fetch photo from R2 if it exists and convert to base64 for email attachment
  let photoAttachment: { filename: string; content: string; content_type: string } | null = null;
  if (photoKey) {
    try {
      const photoObject = await env.PHOTOS.get(photoKey);
      if (photoObject) {
        const arrayBuffer = await photoObject.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        const contentType = photoObject.httpMetadata?.contentType || 'image/jpeg';
        const extension = contentType.split('/')[1] || 'jpg';
        photoAttachment = {
          filename: `property-photo.${extension}`,
          content: base64,
          content_type: contentType,
        };
      }
    } catch (error) {
      console.error('Failed to fetch photo for email:', error);
    }
  }

  const photoHtml = photoAttachment
    ? `<div style="margin: 24px 0;">
        <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Attached Photo</p>
        <img src="cid:property-photo" alt="Property photo" style="max-width: 100%; max-height: 400px; border: 1px solid #e5e7eb;" />
      </div>`
    : '';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f9fafb; padding: 40px 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e5e7eb;">
    <div style="padding: 32px;">
      <h1 style="font-size: 24px; font-weight: 300; color: #111827; margin: 0 0 8px 0;">New Testimonial</h1>
      <p style="color: #6b7280; margin: 0 0 32px 0;">A new testimonial has been submitted and requires your review.</p>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 24px;">
        <div style="margin-bottom: 16px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px 0;">Name</p>
          <p style="color: #111827; margin: 0;">${data.name}</p>
        </div>

        <div style="margin-bottom: 16px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px 0;">Email</p>
          <p style="color: #111827; margin: 0;"><a href="mailto:${data.email}" style="color: #111827;">${data.email}</a></p>
        </div>

        <div style="margin-bottom: 16px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px 0;">Property Address</p>
          <p style="color: #111827; margin: 0;">${data.propertyAddress}</p>
        </div>

        <div style="margin-bottom: 16px;">
          <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 4px 0;">Testimonial</p>
          <blockquote style="color: #111827; margin: 0; padding: 16px; background: #f9fafb; border-left: 3px solid #111827; font-style: italic;">
            "${data.testimonialText}"
          </blockquote>
        </div>

        ${photoHtml}
      </div>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="48%" style="padding-right: 8px;">
              <a href="${approveUrl}" style="display: block; background: #111827; color: white; text-decoration: none; padding: 16px; text-align: center; font-size: 14px; letter-spacing: 0.05em;">APPROVE</a>
            </td>
            <td width="48%" style="padding-left: 8px;">
              <a href="${rejectUrl}" style="display: block; background: white; color: #111827; text-decoration: none; padding: 16px; text-align: center; font-size: 14px; letter-spacing: 0.05em; border: 1px solid #e5e7eb;">REJECT</a>
            </td>
          </tr>
        </table>
      </div>

      <p style="color: #9ca3af; font-size: 12px; margin: 24px 0 0 0; text-align: center;">Testimonial ID: ${testimonialId}</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Cascade Realtors <${env.FROM_EMAIL}>`,
      to: [env.ADMIN_EMAIL, 'neilthomas@berkeley.edu'],
      subject: `New Testimonial: ${data.name} - ${data.propertyAddress}`,
      reply_to: data.email,
      html: htmlContent,
      ...(photoAttachment && {
        attachments: [
          {
            filename: photoAttachment.filename,
            content: photoAttachment.content,
            content_type: photoAttachment.content_type,
            content_id: 'property-photo',
            disposition: 'inline',
          },
        ],
      }),
    }),
  });

  if (!response.ok) {
    console.error('Failed to send admin notification:', await response.text());
  }
}

function renderResultPage(title: string, message: string, success: boolean): string {
  const color = success ? '#16a34a' : '#dc2626';
  const icon = success ? '&#10003;' : '&#10007;';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Cascade California Realty</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f9fafb;
      padding: 20px;
    }
    .container {
      background: white;
      padding: 48px;
      text-align: center;
      max-width: 400px;
      border: 1px solid #e5e7eb;
    }
    .icon {
      width: 64px;
      height: 64px;
      background: ${color};
      color: white;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    h1 {
      font-size: 24px;
      font-weight: 300;
      color: #111827;
      margin-bottom: 12px;
    }
    p {
      color: #6b7280;
      font-weight: 300;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>
  `.trim();
}

async function handleApproveReject(
  request: Request,
  env: Env,
  action: 'approved' | 'rejected'
): Promise<Response> {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const token = url.searchParams.get('token');

  if (!id || !token) {
    return htmlResponse(
      renderResultPage('Invalid Request', 'Missing testimonial ID or token.', false),
      400
    );
  }

  // Verify the token matches
  const testimonial = await env.DB.prepare(
    'SELECT id, status, admin_token FROM testimonials WHERE id = ?'
  )
    .bind(id)
    .first();

  if (!testimonial) {
    return htmlResponse(
      renderResultPage('Not Found', 'This testimonial does not exist.', false),
      404
    );
  }

  if (testimonial.admin_token !== token) {
    return htmlResponse(
      renderResultPage('Unauthorized', 'Invalid token. This link may have expired.', false),
      403
    );
  }

  if (testimonial.status !== 'pending') {
    const statusText = testimonial.status === 'approved' ? 'approved' : 'rejected';
    return htmlResponse(
      renderResultPage(
        'Already Processed',
        `This testimonial has already been ${statusText}.`,
        false
      ),
      400
    );
  }

  // Update the status
  const updateFields =
    action === 'approved'
      ? "status = 'approved', approved_at = datetime('now')"
      : "status = 'rejected'";

  await env.DB.prepare(`UPDATE testimonials SET ${updateFields} WHERE id = ?`).bind(id).run();

  const title = action === 'approved' ? 'Testimonial Approved' : 'Testimonial Rejected';
  const message =
    action === 'approved'
      ? 'The testimonial has been approved and is now ready for display.'
      : 'The testimonial has been rejected and will not be displayed.';

  return htmlResponse(renderResultPage(title, message, action === 'approved'));
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Admin approve/reject endpoints (GET for easy email links)
    if (request.method === 'GET' && path === '/approve') {
      return handleApproveReject(request, env, 'approved');
    }

    if (request.method === 'GET' && path === '/reject') {
      return handleApproveReject(request, env, 'rejected');
    }

    // Serve photos from R2
    if (request.method === 'GET' && path.startsWith('/photo/')) {
      const key = decodeURIComponent(path.slice(7)); // Remove '/photo/' prefix

      if (!key || !key.startsWith('testimonials/')) {
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

    // Public endpoint to get approved testimonials
    if (request.method === 'GET' && path === '/approved') {
      try {
        const testimonials = await env.DB.prepare(
          `SELECT
            id,
            property_address,
            testimonial_text,
            photo_url,
            display_type,
            display_price,
            approved_at
          FROM testimonials
          WHERE status = 'approved'
          ORDER BY approved_at DESC
          LIMIT 20`
        ).all();

        // Convert photo keys to full URLs
        const baseUrl = url.origin;
        const results = testimonials.results.map((t: Record<string, unknown>) => ({
          ...t,
          photo_url: t.photo_url ? `${baseUrl}/photo/${encodeURIComponent(t.photo_url as string)}` : null,
        }));

        return jsonResponse({ testimonials: results }, 200);
      } catch (error) {
        console.error('Error fetching approved testimonials:', error);
        return jsonResponse({ error: 'Failed to fetch testimonials' }, 500);
      }
    }

    // Testimonial submission endpoint
    if (request.method === 'POST' && (path === '/' || path === '')) {
      try {
        const data: TestimonialSubmission = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.propertyAddress || !data.testimonialText) {
          return jsonResponse(
            { error: 'Name, email, property address, and testimonial are required' },
            400
          );
        }

        // Email validation
        if (!isValidEmail(data.email)) {
          return jsonResponse({ error: 'Invalid email address' }, 400);
        }

        // Handle photo upload to R2 (if provided)
        let photoUrl: string | null = null;
        if (data.photo) {
          try {
            photoUrl = await uploadPhotoToR2(env.PHOTOS, data.photo);
          } catch (error) {
            console.error('Photo upload error:', error);
            return jsonResponse(
              { error: error instanceof Error ? error.message : 'Failed to upload photo' },
              400
            );
          }
        }

        // Generate secure admin token
        const adminToken = generateToken();

        // Insert into D1 database
        const result = await env.DB.prepare(
          `INSERT INTO testimonials (name, email, property_address, testimonial_text, photo_url, admin_token)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
          .bind(data.name, data.email, data.propertyAddress, data.testimonialText, photoUrl, adminToken)
          .run();

        const testimonialId = result.meta.last_row_id as number;

        // Get the worker URL for email links
        const workerUrl = url.origin;

        // Send admin notification email with approve/reject links
        await sendAdminNotification(env, data, testimonialId, adminToken, photoUrl, workerUrl);

        return jsonResponse(
          {
            success: true,
            message: 'Thank you! Your testimonial has been submitted for review.',
          },
          200
        );
      } catch (error) {
        console.error('Error:', error);
        return jsonResponse({ error: 'Internal server error' }, 500);
      }
    }

    return new Response('Not found', { status: 404 });
  },
};
