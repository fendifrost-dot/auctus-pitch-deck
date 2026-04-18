import { Link, useParams, Navigate } from 'react-router-dom';
import { SiteShell } from '@/components/SiteShell';
import { getOffering, formatCurrency } from '@/data/offerings';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Download,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const InvestDetail = () => {
  const { id = '' } = useParams();
  const o = getOffering(id);
  if (!o) return <Navigate to="/invest" replace />;

  const pct = Math.round((o.raisedAmount / o.targetAmount) * 100);

  return (
    <SiteShell showDemoBanner>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="container py-12">
          <Link to="/invest" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold text-sm mb-8">
            <ArrowLeft className="h-4 w-4" /> All offerings
          </Link>
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="eyebrow text-cream/50">{o.sector}</span>
                <span className="text-cream/30">·</span>
                <span className="text-[11px] uppercase tracking-wider text-gold font-medium">
                  {o.status}
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl leading-tight">{o.company}</h1>
              <p className="text-xl text-cream/80 max-w-2xl leading-relaxed">{o.tagline}</p>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 text-sm text-cream/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" /> {o.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gold" /> Founded {o.founded}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold" /> {o.investorCount} accredited investors
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold" /> Reg D · 506(c)
                </div>
              </div>
            </div>

            {/* Subscribe card */}
            <div className="bg-cream text-navy p-6 lg:sticky lg:top-24 shadow-elevated">
              <p className="eyebrow mb-4">Offering Summary</p>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-muted-foreground">Raised</span>
                  <span className="stat-number text-2xl">{formatCurrency(o.raisedAmount, { compact: true })}</span>
                </div>
                <div className="h-1 bg-cream-deep overflow-hidden">
                  <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{pct}% of {formatCurrency(o.targetAmount, { compact: true })}</span>
                  <span className="text-navy font-medium">Closes {new Date(o.closingDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5 border-y border-border mb-6 text-sm">
                <div>
                  <p className="eyebrow mb-1">Min Investment</p>
                  <p className="stat-number text-navy text-lg">{formatCurrency(o.minInvestment)}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1">Share Price</p>
                  <p className="stat-number text-navy text-lg">${o.sharePrice.toFixed(2)}</p>
                </div>
              </div>

              <Button asChild variant="primary" size="lg" className="w-full mb-3">
                <Link to={`/invest/${o.id}/checkout`}>
                  Invest Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Available to verified accredited investors only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-cream">
        <div className="container grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">
            {/* Overview */}
            <div>
              <p className="eyebrow mb-3">Company Overview</p>
              <h2 className="font-serif text-3xl text-navy mb-5">The opportunity</h2>
              <p className="text-navy leading-relaxed text-[17px]">{o.longDescription}</p>
            </div>

            {/* Highlights */}
            <div>
              <p className="eyebrow mb-3">Key Metrics</p>
              <h2 className="font-serif text-3xl text-navy mb-6">By the numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                {o.highlights.map((h) => (
                  <div key={h.label} className="bg-white p-5">
                    <p className="eyebrow mb-2">{h.label}</p>
                    <p className="stat-number text-2xl text-navy">{h.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div>
              <p className="eyebrow mb-3">Leadership</p>
              <h2 className="font-serif text-3xl text-navy mb-6">Team</h2>
              <div className="space-y-4">
                {o.team.map((m) => (
                  <div key={m.name} className="flex gap-4 bg-white border border-border p-5">
                    <div className="h-12 w-12 rounded-full bg-navy text-cream flex items-center justify-center font-serif text-sm shrink-0">
                      {m.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-navy">{m.name}</p>
                      <p className="text-sm text-gold-muted mb-1">{m.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <p className="eyebrow mb-3">Data Room</p>
              <h2 className="font-serif text-3xl text-navy mb-6">Documents</h2>
              <div className="border border-border">
                {o.documents.map((d, i) => (
                  <div
                    key={d.name}
                    className={cn(
                      'flex items-center justify-between p-4 bg-white hover:bg-cream-deep transition-colors',
                      i !== o.documents.length - 1 && 'border-b border-border',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gold" />
                      <div>
                        <p className="text-sm text-navy font-medium">{d.name}</p>
                        <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right rail terms */}
          <aside className="space-y-6">
            <div className="bg-white border border-border p-6">
              <p className="eyebrow mb-4">Offering Terms</p>
              <dl className="space-y-3 text-sm">
                {[
                  ['Security Type', 'Preferred Equity'],
                  ['Target Raise', formatCurrency(o.targetAmount)],
                  ['Min Investment', formatCurrency(o.minInvestment)],
                  ['Share Price', `$${o.sharePrice.toFixed(2)}`],
                  ['Filing', 'Reg D, Rule 506(c)'],
                  ['Closing Date', new Date(o.closingDate).toLocaleDateString()],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2 border-b border-border/60 last:border-0">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-navy font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
};

export default InvestDetail;
