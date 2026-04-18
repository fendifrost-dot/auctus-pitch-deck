import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant?: 'light' | 'dark';
  to?: string;
}

export function Wordmark({ className, variant = 'dark', to = '/' }: Props) {
  const color = variant === 'light' ? 'text-cream' : 'text-navy';
  return (
    <Link to={to} className={cn('inline-flex items-baseline gap-1 group', className)}>
      <span className={cn('font-serif text-xl tracking-[0.18em] font-medium', color)}>AUCTUS</span>
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
    </Link>
  );
}
