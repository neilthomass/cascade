-- Admin Panel Schema
-- Run this against the cascade-testimonials D1 database:
-- wrangler d1 execute cascade-testimonials --file=schema.sql

-- OTP codes for passwordless login
CREATE TABLE IF NOT EXISTS admin_otp_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  used INTEGER DEFAULT 0
);

-- Active admin sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- Agent bios (comprehensive fields)
CREATE TABLE IF NOT EXISTS agent_bios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title TEXT,
  photo_url TEXT,
  bio_text TEXT,
  email TEXT,
  phone TEXT,
  certifications TEXT,     -- JSON array
  specialties TEXT,        -- JSON array
  years_experience INTEGER,
  social_links TEXT,       -- JSON object
  languages TEXT,          -- JSON array
  areas_served TEXT,       -- JSON array
  education TEXT,          -- JSON array
  awards TEXT,             -- JSON array
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_otp_email ON admin_otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON admin_otp_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_agent_bios_active ON agent_bios(is_active, display_order);
