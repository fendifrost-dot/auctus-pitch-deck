import { DashboardShell } from '@/components/DashboardShell';
import { OFFERINGS, formatCurrency } from '@/data/offerings';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, Download, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const myOffering = OFFERINGS[0];

const investorActivity = [
  { name: 'David W.', amount: 100_000, date: '2 hours ago', status: 'Committed' },
  { name: 'Rachel O.', amount: 50_000, date: '8 hours ago', status: 'Funded' },
  { name: 'Anonymous LP', amount: 75_000, date: 'Yesterday', status: 'Funded' },
  { name: 'Carlos M.', amount: 25_000, date: '2 days ago', status: 'Reviewing' },
  { name: 'Priya S.', amount: 50_000, date: '3 days ago', status: 'Funded' },
];

const compliance = [
  { task: 'Form D filed with SEC', done: true },
  { task: 'PPM finalized', done: true },
  { task: 'Subscription agreement template approved', done: true },
  { task: 'Investor accreditation framework live', done: true },
  { task: 'Q2 quarterly report submitted', done: false },
  { task: 'Blue Sky filings (multi-state)', done: false },
];

const IssuerDashboard = () => {
  const pct = Math.round((myOffering.raisedAmount / myOffering.targetAmount) * 100);

  return (
    <DashboardShell
      title={myOffering.company}
      subtitle="Live offering management and investor activity."
      showDemoBanner
      actions={<Button variant="primary">View public listing</Button>}
    >
      {/* Progress hero */}
      <div className="bg-navy text-cream p-8 mb-10 shadow-elevated">
        <div className="grid md:grid-cols-4 gap-8 items-end mb-6">
          <div className="md:col-span-2">
            <p className="eyebrow text-cream/50 mb-2">Offering Status · Open</p>
            <p className="stat-number text-5xl text-cream mb-1">
              {formatCurrency(myOffering.raisedAmount, { compact: true })}
            </p>
            <p className="text-cream/60 text-sm">
              of {formatCurrency(myOffering.targetAmount, { compact: true })} target · {pct}% subscribed
            </p>
          </div>
          <div>
            <p className="eyebrow text-cream/50 mb-1">Investors</p>
            <p className="stat-number text-2xl text-cream">{myOffering.investorCount}</p>
          </div>
          <div>
            <p className="eyebrow text-cream/50 mb-1">Closes</p>
            <p className="stat-number text-2xl text-cream">{new Date(myOffering.closingDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="h-1.5 bg-cream/10 overflow-hidden">
          <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* Activity */}
        <div id="activity" className="lg:col-span-2 bg-white border border-border">
          <div className="px-6 py-5 border-b border-border flex items-center justify-between">
            <div>
              <p className="eyebrow">Investor Activity</p>
              <h2 className="font-serif text-xl text-navy">Recent commitments</h2>
            </div>
            <TrendingUp className="h-5 w-5 text-gold" />
          </div>
          <ul>
            {investorActivity.map((a, i) => (
              <li
                key={i}
                className="px-6 py-4 flex items-center justify-between border-t border-border first:border-t-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-cream-deep flex items-center justify-center text-xs font-medium text-navy">
                    {a.name.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm text-navy font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="stat-number text-navy">{formatCurrency(a.amount)}</p>
                  <p
                    className={cn(
                      'text-[11px] uppercase tracking-wider',
                      a.status === 'Funded' && 'text-success',
                      a.status === 'Committed' && 'text-gold',
                      a.status === 'Reviewing' && 'text-muted-foreground',
                    )}
                  >
                    {a.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance */}
        <div id="compliance" className="bg-white border border-border">
          <div className="px-6 py-5 border-b border-border">
            <p className="eyebrow">Compliance</p>
            <h2 className="font-serif text-xl text-navy">Checklist</h2>
          </div>
          <ul className="p-2">
            {compliance.map((c) => (
              <li key={c.task} className="flex items-start gap-3 p-3 text-sm">
                <span
                  className={cn(
                    'mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0',
                    c.done ? 'bg-gold text-navy' : 'border border-border bg-white',
                  )}
                >
                  {c.done && <Check className="h-3 w-3" />}
                  {!c.done && <Clock className="h-2.5 w-2.5 text-muted-foreground" />}
                </span>
                <span className={c.done ? 'text-navy' : 'text-muted-foreground'}>{c.task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Documents */}
      <div id="documents" className="bg-white border border-border">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="eyebrow">Document Management</p>
            <h2 className="font-serif text-xl text-navy">Offering documents</h2>
          </div>
          <Button variant="outline-navy" size="sm">Upload</Button>
        </div>
        <div>
          {myOffering.documents.map((d, i) => (
            <div
              key={d.name}
              className={cn(
                'flex items-center justify-between p-4',
                i !== 0 && 'border-t border-border',
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-gold" />
                <div>
                  <p className="text-sm text-navy font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.type} · {d.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};

export default IssuerDashboard;
