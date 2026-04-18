import { Wordmark } from './Wordmark';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream/80">
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Wordmark variant="light" />
          <p className="text-sm text-cream/60 max-w-sm leading-relaxed">
            Institutional-grade access to private market opportunities under Regulation D 506(c).
            For accredited investors only.
          </p>
          <div className="inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-cream/70">
              Backed by Continuum Capital Group
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow text-cream/50 mb-4">Platform</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/invest" className="hover:text-gold">Browse Offerings</Link></li>
            <li><Link to="/raise" className="hover:text-gold">Raise Capital</Link></li>
            <li><Link to="/login" className="hover:text-gold">Sign In</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/50 mb-4">Legal</p>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-gold" href="#">Terms of Service</a></li>
            <li><a className="hover:text-gold" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-gold" href="#">Form CRS</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container py-6 text-[11px] text-cream/50 leading-relaxed space-y-2">
          <p>
            AUCTUS is a demonstration platform. Nothing on this site constitutes an offer to sell
            or a solicitation of an offer to buy any security. All offerings shown are illustrative
            and fictional.
          </p>
          <p className="flex items-center justify-between flex-wrap gap-2">
            <span>© {new Date().getFullYear()} AUCTUS Markets, Inc.</span>
            <span className="uppercase tracking-[0.18em]">Regulation D · Rule 506(c)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
