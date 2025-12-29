-- Testimonials table for storing client submissions
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Submission data
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  property_address TEXT NOT NULL,
  testimonial_text TEXT NOT NULL,
  photo_url TEXT,

  -- Metadata
  submitted_at TEXT DEFAULT (datetime('now')),

  -- Approval workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_token TEXT NOT NULL,  -- Secure token for email approve/reject links
  approved_at TEXT,

  -- Optional display customization (admin can set after approval)
  display_type TEXT,
  display_price TEXT
);

-- Index for filtering by status (for fetching approved testimonials)
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

-- Index for ordering by submission date
CREATE INDEX IF NOT EXISTS idx_testimonials_submitted_at ON testimonials(submitted_at);

-- Index for ordering approved testimonials by approval date
CREATE INDEX IF NOT EXISTS idx_testimonials_approved_at ON testimonials(approved_at);
