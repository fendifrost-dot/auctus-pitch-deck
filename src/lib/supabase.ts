import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client — scaffolded with placeholder env vars.
 * The real project will be connected later by setting:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *
 * Until then, the client is initialized against a placeholder URL.
 * The AuthContext detects this and falls back to a local mock session
 * so the demo flows (login/signup/role) work without a backend.
 */

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-anon-key';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? PLACEHOLDER_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? PLACEHOLDER_KEY;

export const isSupabaseConfigured =
  SUPABASE_URL !== PLACEHOLDER_URL && SUPABASE_ANON_KEY !== PLACEHOLDER_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
