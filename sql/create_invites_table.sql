-- Create invites table for Workflow 2: Invite-based registration
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255),  -- Optional: pre-specify email for invite
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  used_at TIMESTAMPTZ,
  used_by UUID REFERENCES auth.users(id),
  created_by VARCHAR(255) NOT NULL,  -- Admin email who created the invite
  notes TEXT  -- Optional notes about who this invite is for
);

-- Create index for token lookups
CREATE INDEX IF NOT EXISTS idx_invites_token ON public.invites(token);

-- Create index for finding unused invites
CREATE INDEX IF NOT EXISTS idx_invites_unused ON public.invites(used_at) WHERE used_at IS NULL;

-- Disable RLS for simplicity (admin-only access controlled at API level)
ALTER TABLE public.invites DISABLE ROW LEVEL SECURITY;

-- Grant access to authenticated users (for API calls)
GRANT ALL ON public.invites TO authenticated;
GRANT ALL ON public.invites TO anon;
