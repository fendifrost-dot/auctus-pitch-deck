import { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { OFFERINGS, formatCurrency } from '@/data/offerings';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const AdminOfferings = () => {
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(OFFERINGS.map((o) => [o.id, true])),
  );

  const toggle = (id: string) => {
    setPublished((p) => {
      const next = { ...p, [id]: !p[id] };
      toast.success(next[id] ? 'Offering published.' : 'Offering unpublished.');
      return next;
    });
  };

  return (
    <DashboardShell title="Offering Management" subtitle="Publish, unpublish, and monitor every offering on the platform.">
      <div className="grid gap-4">
        {OFFERINGS.map((o) => {
          const isPublished = published[o.id];
          const pct = Math.round((o.raisedAmount / o.targetAmount) * 100);
          return (
            <div key={o.id} className="bg-white border border-border p-6 flex items-center gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-xl text-navy">{o.company}</h3>
                  <span
                    className={cn(
                      'text-[11px] uppercase tracking-wider px-2 py-0.5',
                      isPublished ? 'bg-gold/15 text-gold-muted' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {isPublished ? 'Published' : 'Unpublished'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{o.sector} · {o.location}</p>
              </div>
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="eyebrow mb-1">Target</p>
                  <p className="stat-number text-navy">{formatCurrency(o.targetAmount, { compact: true })}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1">Raised</p>
                  <p className="stat-number text-navy">{pct}%</p>
                </div>
                <div>
                  <p className="eyebrow mb-1">Investors</p>
                  <p className="stat-number text-navy">{o.investorCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <Switch checked={isPublished} onCheckedChange={() => toggle(o.id)} />
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Live</span>
                </div>
                <Button size="sm" variant="outline-navy">Edit</Button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
};

export default AdminOfferings;
