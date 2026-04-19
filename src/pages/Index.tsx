import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SiteShell } from '@/components/SiteShell';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  Building2,
  Users2,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '@/data/offerings';
import { useOfferings } from '@/hooks/useOfferings';

const Index = () => {
  const { data: offerings = [] } = useOfferings();
  const featured = offerings.slice(0, 3);

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-cream">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="container relative pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-gold/30 px-3 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-cream/80">
                Backed by Continuum Capital Group
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-cream mb-6">
              The Future of <br />
              <span className="text-gold italic font-normal">Private Market</span> Access.
            </h1>
            <p className="text-lg md:text-xl text-cream/70 max-w-2xl leading-relaxed mb-10">
              An institutional-grade venue connecting accredited capital with vetted operators
              under Regulation D 506(c). Diligence, documents, and execution — in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="gold" size="xl" className="group">
                <Link to="/raise">
                  Raise Capital
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline-gold"
                size="xl"
                className="text-cream hover:text-navy"
              >
                <Link to="/invest">Start Investing</Link>
              </Button>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 border-t border-cream/10 pt-10">
            {[
              { v: '$3.35M', l: 'Capital under offering' },
              { v: '4', l: 'Active 506(c) deals' },
              { v: '55', l: 'Accredited investors' },
              { v: '506(c)', l: 'Regulatory framework' },
            ].map((s) => (
              <div key={s.l}>
                <div className="stat-number text-3xl md:text-4xl text-cream">{s.v}</div>
                <div className="eyebrow text-cream/50 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUAL VALUE PROP */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow mb-3">Two Sides. One Standard.</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy">
              Built for both sides of the table.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Issuer card */}
            <div className="bg-white border border-border p-10 group hover:shadow-elevated transition-shadow">
              <Building2 className="h-7 w-7 text-gold mb-6" strokeWidth={1.5} />
              <p className="eyebrow mb-2">For Issuers</p>
              <h3 className="font-serif text-3xl text-navy mb-4">Raise capital with discipline.</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Run a structured 506(c) raise with templated documents, verified investor
                onboarding, and a single source of truth for compliance.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'CCG-vetted issuer pipeline',
                  'PPM, Sub Docs, Form D templates',
                  'Investor accreditation handled',
                  'Real-time raise dashboard',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span className="text-navy">{t}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="primary">
                <Link to="/raise">
                  Apply to raise <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Investor card */}
            <div className="bg-navy text-cream p-10 group hover:shadow-elevated transition-shadow relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(hsl(var(--gold)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative">
                <Users2 className="h-7 w-7 text-gold mb-6" strokeWidth={1.5} />
                <p className="eyebrow text-cream/50 mb-2">For Investors</p>
                <h3 className="font-serif text-3xl text-cream mb-4">
                  Curated access. Institutional rigor.
                </h3>
                <p className="text-cream/70 leading-relaxed mb-8">
                  Browse private offerings vetted through CCG's underwriting framework. Review
                  diligence materials, subscribe, and manage positions in one venue.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    '$25,000 minimum across all offerings',
                    'Full data room access pre-commitment',
                    'Subscription documents in-platform',
                    'Quarterly issuer reporting',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-cream/90">{t}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="gold">
                  <Link to="/invest">
                    Browse offerings <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-cream-deep">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="font-serif text-4xl text-navy">A disciplined process, end to end.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                icon: ShieldCheck,
                title: '01 — Verification',
                body: 'Investors are verified as accredited under Rule 506(c). Issuers are pre-vetted by CCG underwriting.',
              },
              {
                icon: FileCheck2,
                title: '02 — Diligence',
                body: 'Full data room access including PPM, financials, subscription agreement, and Form D filings.',
              },
              {
                icon: TrendingUp,
                title: '03 — Subscription',
                body: 'Execute subscription documents in-platform, fund the commitment, and track the position to closing.',
              },
            ].map((s) => (
              <div key={s.title} className="bg-cream p-8">
                <s.icon className="h-6 w-6 text-gold mb-6" strokeWidth={1.5} />
                <p className="eyebrow mb-3">{s.title}</p>
                <p className="text-navy leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED OFFERINGS */}
      <section className="py-24 bg-cream">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="eyebrow mb-3">Now on the platform</p>
              <h2 className="font-serif text-4xl text-navy">Featured offerings.</h2>
            </div>
            <Button asChild variant="outline-navy">
              <Link to="/invest">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((o) => {
              const pct = Math.round((o.raisedAmount / o.targetAmount) * 100);
              return (
                <Link
                  key={o.id}
                  to={`/invest/${o.id}`}
                  className="bg-white border border-border p-7 hover:border-gold/60 hover:shadow-card transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="eyebrow">{o.sector}</span>
                    <span className="text-[11px] uppercase tracking-wider text-gold">
                      {o.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-gold-muted transition-colors">
                    {o.company}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                    {o.tagline}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target</span>
                      <span className="stat-number text-navy">{formatCurrency(o.targetAmount, { compact: true })}</span>
                    </div>
                    <div className="h-1 bg-cream-deep overflow-hidden">
                      <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
                      <span>{pct}% Subscribed</span>
                      <span>{o.investorCount} investors</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-20 bg-navy text-cream">
        <div className="container">
          <p className="eyebrow text-cream/50 text-center mb-10">Trusted by operators and capital allocators</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-80">
            {['CONTINUUM', 'MERIDIAN', 'CASCADE', 'SUMMIT RIDGE', 'GREENLINE'].map((n) => (
              <div key={n} className="font-serif text-cream/60 tracking-[0.25em] text-sm">
                {n}
              </div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                quote:
                  'AUCTUS gave us institutional infrastructure on day one. We closed our raise eleven days ahead of schedule.',
                who: 'Eleanor Hayes',
                role: 'CEO, Summit Ridge Coffee',
              },
              {
                quote:
                  'The diligence rigor on this venue is rare for this asset class. Real PPMs, real Form D filings, real reporting cadence.',
                who: 'David Whitcomb',
                role: 'Managing Partner, Meridian',
              },
              {
                quote:
                  'A clean execution layer for 506(c) deal flow. Exactly what the lower middle market has been missing.',
                who: 'CCG Underwriting',
                role: 'Continuum Capital Group',
              },
            ].map((t) => (
              <div key={t.who} className="space-y-4">
                <div className="gold-rule" />
                <p className="text-cream/85 leading-relaxed font-serif italic text-lg">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-cream font-medium text-sm">{t.who}</p>
                  <p className="text-cream/50 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-cream-deep">
        <div className="container max-w-4xl text-center">
          <Lock className="h-7 w-7 text-gold mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="font-serif text-4xl md:text-5xl text-navy mb-6">
            Capital deserves an institutional venue.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Open an accredited investor account or apply as an issuer. Approval typically within
            72 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="primary" size="lg">
              <Link to="/signup">Open an account</Link>
            </Button>
            <Button asChild variant="outline-navy" size="lg">
              <Link to="/invest">Browse offerings</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default Index;
