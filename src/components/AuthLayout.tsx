import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Wordmark } from '@/components/Wordmark';
import { ShieldCheck } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-navy text-cream p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <Wordmark variant="light" />
        <div className="relative max-w-md space-y-8">
          <div className="gold-rule" />
          <h2 className="font-serif text-4xl leading-tight text-cream">
            "An institutional venue for private capital — finally built with the discipline this
            asset class deserves."
          </h2>
          <div>
            <p className="text-cream font-medium">Continuum Capital Group</p>
            <p className="text-cream/50 text-sm">Founding Partner</p>
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cream/50">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          Regulation D · Rule 506(c)
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col bg-cream">
        <div className="lg:hidden p-6 border-b border-border">
          <Link to="/"><Wordmark /></Link>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h1 className="font-serif text-3xl text-navy mb-2">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
            {footer && <div className="mt-8 text-sm text-muted-foreground">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
