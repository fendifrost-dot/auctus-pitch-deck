import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client — wired to the real project by default.
 * Env vars VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY can override the defaults.
 *
 * The publishable key below is safe to ship to the client: data access is
 * gated by RLS policies (see migrations 2+3), not by key secrecy.
 */

const DEFAULT_URL = 'https://yelkmaomwmvzskmlhkde.supabase.co';
const DEFAULT_KEY = 'sb_publishable_T_QZ6MkFZd0ZFttVlxkjhQ_sK2EnDb5';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? DEFAULT_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? DEFAULT_KEY;

export const isSupabaseConfigured = true;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
