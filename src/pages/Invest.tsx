import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteShell } from '@/components/SiteShell';
import { SECTORS, formatCurrency, Sector } from '@/data/offerings';
import { useOfferings } from '@/hooks/useOfferings';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Invest = () => {
  const [sector, setSector] = useState<Sector | 'all'>('all');
  const [sort, setSort] = useState<'newest' | 'progress' | 'target'>('newest');
  const [query, setQuery] = useState('');
  const { data: allOfferings = [], isLoading } = useOfferings();

  const offerings = useMemo(() => {
    let list = [...allOfferings];
    if (sector !== 'all') list = list.filter((o) => o.sector === sector);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (o) => o.company.toLowerCase().includes(q) || o.tagline.toLowerCase().includes(q),
      );
    }
    if (sort === 'progress') {
      list.sort((a, b) => b.raisedAmount / b.targetAmount - a.raisedAmount / a.targetAmount);
    } else if (sort === 'target') {
      list.sort((a, b) => b.targetAmount - a.targetAmount);
    }
    return list;
  }, [allOfferings, sector, sort, query]);

  return (
    <SiteShell showDemoBanner>
      {/* Header */}
      <section className="bg-navy text-cream py-16">
        <div className="container">
          <p className="eyebrow text-cream/50 mb-3">Reg D · 506(c) Offerings</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4 max-w-3xl">
            Curated private offerings, vetted by Continuum Capital Group.
          </h1>
          <p className="text-cream/70 max-w-2xl">
            Open to accredited investors. Minimum $25,000 across all offerings. Full data room
            access pre-commitment.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-b border-border bg-cream sticky top-16 z-30">
        <div className="container py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search company or thesis"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <Select value={sector} onValueChange={(v) => setSector(v as Sector | 'all')}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sectors</SelectItem>
              {SECTORS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="progress">Most subscribed</SelectItem>
              <SelectItem value="target">Largest raise</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-sm text-muted-foreground">
            {offerings.length} {offerings.length === 1 ? 'offering' : 'offerings'}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container grid md:grid-cols-2 gap-6">
          {isLoading && Array.from({ length: 4 }).map((_, i) => (
            <div key={`skel-${i}`} className="bg-white border border-border p-7">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-7 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
          {!isLoading && offerings.length === 0 && (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              <p className="font-serif text-2xl text-navy mb-2">No offerings match your filters.</p>
              <p className="text-sm">Clear the filters or check back soon — new deals are added weekly.</p>
            </div>
          )}
          {!isLoading && offerings.map((o) => {
            const pct = Math.round((o.raisedAmount / o.targetAmount) * 100);
            const statusColor =
              o.status === 'Closing Soon' ? 'text-warning' : o.status === 'Funded' ? 'text-success' : 'text-gold';
            return (
              <Link
                key={o.id}
                to={`/invest/${o.id}`}
                className="group bg-white border border-border hover:border-gold/60 hover:shadow-elevated transition-all"
              >
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="eyebrow mb-1">{o.sector} · {o.location}</p>
                      <h3 className="font-serif text-2xl text-navy group-hover:text-gold-muted transition-colors">
                        {o.company}
                      </h3>
                    </div>
                    <span className={cn('text-[11px] uppercase tracking-wider font-medium', statusColor)}>
                      {o.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                    {o.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border/70">
                    <div>
                      <p className="eyebrow mb-1">Target</p>
                      <p className="stat-number text-navy">{formatCurrency(o.targetAmount, { compact: true })}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-1">Min</p>
                      <p className="stat-number text-navy">{formatCurrency(o.minInvestment, { compact: true })}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-1">Investors</p>
                      <p className="stat-number text-navy">{o.investorCount}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{formatCurrency(o.raisedAmount, { compact: true })} raised</span>
                      <span className="stat-number text-navy">{pct}%</span>
                    </div>
                    <div className="h-1 bg-cream-deep overflow-hidden">
                      <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm text-navy font-medium group-hover:text-gold-muted">
                    View deal <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
};

export default Invest;
