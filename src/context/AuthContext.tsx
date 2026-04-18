import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export type UserRole = 'investor' | 'issuer' | 'admin';

export interface AuctusUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuctusUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function hydrateFromProfile(
  sessionUser: { id: string; email?: string | null; user_metadata?: Record<string, unknown> },
): Promise<AuctusUser> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, role')
    .eq('id', sessionUser.id)
    .maybeSingle();

  const meta = (sessionUser.user_metadata ?? {}) as { name?: string; role?: UserRole };
  const email = profile?.email ?? sessionUser.email ?? '';

  return {
    id: sessionUser.id,
    email,
    name: profile?.full_name ?? meta.name ?? email.split('@')[0] ?? 'User',
    role: (profile?.role as UserRole) ?? meta.role ?? 'investor',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuctusUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe FIRST, then fetch existing session.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Defer Supabase call to avoid deadlock inside the auth callback.
        setTimeout(() => {
          hydrateFromProfile(session.user).then(setUser);
        }, 0);
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const u = await hydrateFromProfile(session.user);
        setUser(u);
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      const u = await hydrateFromProfile(data.user);
      setUser(u);
    }
    return {};
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { name, role },
      },
    });
    return error ? { error: error.message } : {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
