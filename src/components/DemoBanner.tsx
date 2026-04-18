import { AlertTriangle } from 'lucide-react';

interface Props {
  message?: string;
}

export function DemoBanner({
  message = 'DEMO — Not a real offering. No securities are being offered or sold.',
}: Props) {
  return (
    <div className="w-full border-b border-gold/40 bg-gold/10">
      <div className="container flex items-center gap-2 py-2 text-[12px] text-navy">
        <AlertTriangle className="h-3.5 w-3.5 text-gold-muted" />
        <span className="font-medium tracking-wide uppercase text-[11px]">{message}</span>
      </div>
    </div>
  );
}
