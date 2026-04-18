import { Link } from 'react-router-dom';
import { SiteShell } from '@/components/SiteShell';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardCheck, FileSearch, Rocket, ShieldCheck } from 'lucide-react';

const Raise = () => {
  return (
    <SiteShell>
      <section className="bg-navy text-cream py-20 lg:py-28">
        <div className="container max-w-4xl">
          <p className="eyebrow text-cream/50 mb-3">For Operators & Sponsors</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-6">
            Raise from accredited capital — <span className="text-gold italic font-normal">with discipline.</span>
          </h1>
          <p className="text-cream/75 text-xl max-w-2xl leading-relaxed mb-10">
            Run a 506(c) raise on institutional rails: vetted underwriting, templated diligence,
            verified investor onboarding, and a single dashboard for the entire offering.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="gold" size="xl">
              <Link to="/onboard/issuer">Apply to raise <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline-gold" size="xl" className="text-cream hover:text-navy">
              <Link to="/invest">See live offerings</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-3">The Process</p>
            <h2 className="font-serif text-4xl text-navy">Three steps from application to closing.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                icon: ClipboardCheck,
                step: '01',
                title: 'Apply',
                body: 'Submit company details, financials, and intended raise structure. CCG-affiliated issuers receive prioritized review.',
              },
              {
                icon: FileSearch,
                step: '02',
                title: 'Get Approved',
                body: 'Underwriting review by the AUCTUS investment committee. Typical decision within 14 business days.',
              },
              {
                icon: Rocket,
                step: '03',
                title: 'Raise Capital',
                body: 'Offering goes live to verified accredited investors. Track commitments and close in real-time.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white p-8">
                <s.icon className="h-7 w-7 text-gold mb-6" strokeWidth={1.5} />
                <p className="eyebrow mb-2">{s.step} — {s.title}</p>
                <p className="text-navy leading-relaxed mt-3">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream-deep">
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-3">What you get</p>
            <h2 className="font-serif text-4xl text-navy mb-6">An institutional raise, without the institutional overhead.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Most lower-middle-market issuers cobble together law firms, deck designers, escrow
              providers, and CRMs. AUCTUS replaces all of it with one venue purpose-built for
              506(c) execution.
            </p>
            <ul className="space-y-3">
              {[
                'Templated PPM, Subscription Agreement, and Form D',
                'Investor accreditation handled in-platform',
                'Real-time commitment tracking and waterfall logic',
                'Quarterly reporting cadence built in',
                'Direct distribution to AUCTUS verified investor base',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-navy">
                  <ShieldCheck className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy text-cream p-10 shadow-elevated">
            <p className="eyebrow text-cream/50 mb-4">Issuer Snapshot</p>
            <div className="space-y-5">
              <div>
                <p className="stat-number text-4xl text-gold">11 days</p>
                <p className="text-cream/60 text-sm">Average time from application to approval</p>
              </div>
              <div className="hairline border-cream/10" />
              <div>
                <p className="stat-number text-4xl text-gold">$3.35M</p>
                <p className="text-cream/60 text-sm">Capital under offering across the platform</p>
              </div>
              <div className="hairline border-cream/10" />
              <div>
                <p className="stat-number text-4xl text-gold">55</p>
                <p className="text-cream/60 text-sm">Verified accredited investors actively allocating</p>
              </div>
            </div>
            <Button asChild variant="gold" size="lg" className="mt-8 w-full">
              <Link to="/onboard/issuer">Start application <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default Raise;
