import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/context/AuthContext';
import { toast } from 'sonner';
import { TrendingUp, Building2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const Signup = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('investor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signUp(email, password, name, role);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Account created.');
    navigate(role === 'issuer' ? '/onboard/issuer' : '/dashboard/investor');
  };

  const roleOptions: { value: UserRole; title: string; sub: string; icon: typeof TrendingUp }[] = [
    { value: 'investor', title: 'I want to invest', sub: 'Browse and subscribe to vetted private offerings.', icon: TrendingUp },
    { value: 'issuer', title: 'I want to raise capital', sub: 'Run a structured 506(c) raise on the platform.', icon: Building2 },
  ];

  return (
    <AuthLayout
      title="Open an AUCTUS account"
      subtitle="A few details to get started. Verification follows."
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-navy underline underline-offset-4 hover:text-gold">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label className="eyebrow">Choose your path</Label>
          <div className="grid gap-3">
            {roleOptions.map((opt) => {
              const active = role === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={cn(
                    'text-left border p-4 transition-all flex items-start gap-4',
                    active
                      ? 'border-gold bg-gold/5 shadow-card'
                      : 'border-border bg-white hover:border-navy/40',
                  )}
                >
                  <Icon
                    className={cn('h-5 w-5 mt-0.5 shrink-0', active ? 'text-gold' : 'text-muted-foreground')}
                    strokeWidth={1.5}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-navy">{opt.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.sub}</p>
                  </div>
                  {active && <Check className="h-4 w-4 text-gold mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Open account'}
        </Button>

      </form>
    </AuthLayout>
  );
};

export default Signup;
