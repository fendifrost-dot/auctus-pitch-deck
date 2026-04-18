import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

const Login = () => {
  const { signIn, mockMode } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') ?? '/dashboard/investor';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Welcome back.');
    navigate(redirect);
  };

  return (
    <AuthLayout
      title="Sign in to AUCTUS"
      subtitle="Access your accredited investor account."
      footer={
        <p>
          New to AUCTUS?{' '}
          <Link to="/signup" className="text-navy underline underline-offset-4 hover:text-gold">
            Open an account
          </Link>
        </p>
      }
    >
      {mockMode && (
        <div className="mb-6 flex gap-3 border border-gold/40 bg-gold/10 p-3 text-xs text-navy">
          <Info className="h-4 w-4 text-gold-muted shrink-0 mt-0.5" />
          <div>
            <p className="font-medium uppercase tracking-wide text-[11px] mb-1">Demo mode</p>
            <p className="text-navy/80">
              Any email/password works. Use{' '}
              <code className="bg-cream-deep px-1">admin@auctus.demo</code> /{' '}
              <code className="bg-cream-deep px-1">demo</code> for the admin console.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-muted-foreground hover:text-navy">
              Forgot?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
