import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
  /** True when running against placeholder Supabase config (mock mode). */
  mockMode: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_KEY = 'auctus_demo_session';

function readMock(): AuctusUser | null {
  try {
    const raw = sessionStorage.getItem(MOCK_KEY);
    return raw ? (JSON.parse(raw) as AuctusUser) : null;
  } catch {
    return null;
  }
}

function writeMock(user: AuctusUser | null) {
  if (user) sessionStorage.setItem(MOCK_KEY, JSON.stringify(user));
  else sessionStorage.removeItem(MOCK_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuctusUser | null>(null);
  const [loading, setLoading] = useState(true);
  const mockMode = !isSupabaseConfigured;

  useEffect(() => {
    if (mockMode) {
      setUser(readMock());
      setLoading(false);
      return;
    }

    // Real Supabase: subscribe FIRST, then fetch existing session.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata as { name?: string; role?: UserRole };
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: meta.name ?? session.user.email?.split('@')[0] ?? 'User',
          role: meta.role ?? 'investor',
        });
      } else {
        setUser(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata as { name?: string; role?: UserRole };
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          name: meta.name ?? session.user.email?.split('@')[0] ?? 'User',
          role: meta.role ?? 'investor',
        });
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, [mockMode]);

  const signIn = async (email: string, password: string) => {
    if (mockMode) {
      // Admin demo gate
      if (email === 'admin@auctus.demo' && password === 'demo') {
        const u: AuctusUser = { id: 'admin-1', email, name: 'Admin', role: 'admin' };
        writeMock(u);
        setUser(u);
        return {};
      }
      if (!email || !password) return { error: 'Email and password are required.' };
      const stored = readMock();
      const u: AuctusUser =
        stored && stored.email === email
          ? stored
          : { id: 'demo-' + email, email, name: email.split('@')[0], role: 'investor' };
      writeMock(u);
      setUser(u);
      return {};
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error ? { error: error.message } : {};
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    if (mockMode) {
      if (!email || !password || !name) return { error: 'All fields are required.' };
      const u: AuctusUser = { id: 'demo-' + email, email, name, role };
      writeMock(u);
      setUser(u);
      return {};
    }
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
    if (mockMode) {
      writeMock(null);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, mockMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
