import { DashboardShell } from '@/components/DashboardShell';
import { formatCurrency } from '@/data/offerings';
import { useAllOfferings } from '@/hooks/useOfferings';
import { ArrowUpRight, Building2, Users, Briefcase, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ccgPipeline = [
  { name: 'Northwind Manufacturing', sector: 'Industrial', stage: 'Underwriting', target: 1_500_000, source: 'CCG Direct' },
  { name: 'Atlas Health Partners', sector: 'Healthcare', stage: 'Application', target: 2_200_000, source: 'CCG Direct' },
  { name: 'Beacon Hill Spirits', sector: 'Consumer', stage: 'IC Review', target: 800_000, source: 'CCG Referral' },
  { name: 'Ridgeline Robotics', sector: 'Software', stage: 'Diligence', target: 1_100_000, source: 'CCG Direct' },
];

const Admin = () => {
  const { data: offerings = [] } = useAllOfferings();
  const totalRaised = offerings.reduce((s, o) => s + o.raisedAmount, 0);
  const totalInvestors = offerings.reduce((s, o) => s + o.investorCount, 0);

  const stats = [
    { label: 'Active Issuers', value: offerings.length.toString(), icon: Building2 },
    { label: 'Active Investors', value: totalInvestors.toString(), icon: Users },
    { label: 'Live Offerings', value: offerings.filter((o) => o.status !== 'Funded' && o.status !== 'Draft').length.toString(), icon: Briefcase },
    { label: 'Capital Raised', value: formatCurrency(totalRaised, { compact: true }), icon: DollarSign },
  ];

  return (
    <DashboardShell title="Platform Overview" subtitle="Real-time view of platform activity, pipeline, and capital flow.">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-10">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="eyebrow">{s.label}</p>
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <p className="stat-number text-3xl text-navy">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Live offerings table */}
      <div className="bg-white border border-border mb-10">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="eyebrow">Live Offerings</p>
            <h2 className="font-serif text-xl text-navy">All active raises</h2>
          </div>
          <Link
            to="/admin/offerings"
            className="text-sm text-navy hover:text-gold flex items-center gap-1"
          >
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-deep">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Issuer</th>
                <th className="px-6 py-3 font-medium">Sector</th>
                <th className="px-6 py-3 font-medium text-right">Target</th>
                <th className="px-6 py-3 font-medium text-right">Raised</th>
                <th className="px-6 py-3 font-medium text-right">Investors</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {offerings.map((o) => {
                const pct = Math.round((o.raisedAmount / o.targetAmount) * 100);
                return (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-6 py-4 text-navy font-medium">{o.company}</td>
                    <td className="px-6 py-4 text-muted-foreground">{o.sector}</td>
                    <td className="px-6 py-4 text-right stat-number text-navy">
                      {formatCurrency(o.targetAmount, { compact: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="stat-number text-navy">{formatCurrency(o.raisedAmount, { compact: true })}</div>
                      <div className="text-xs text-muted-foreground">{pct}%</div>
                    </td>
                    <td className="px-6 py-4 text-right text-navy">{o.investorCount}</td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] uppercase tracking-wider text-gold font-medium">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CCG pipeline */}
      <div className="bg-white border border-border">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="eyebrow">CCG Pipeline</p>
            <h2 className="font-serif text-xl text-navy">Continuum-referred issuers</h2>
          </div>
          <span className="text-xs uppercase tracking-wider text-gold">{ccgPipeline.length} in pipeline</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-deep">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Sector</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Stage</th>
                <th className="px-6 py-3 font-medium text-right">Target</th>
              </tr>
            </thead>
            <tbody>
              {ccgPipeline.map((p) => (
                <tr key={p.name} className="border-t border-border">
                  <td className="px-6 py-4 text-navy font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.sector}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.source}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs px-2 py-1 bg-cream-deep text-navy">{p.stage}</span>
                  </td>
                  <td className="px-6 py-4 text-right stat-number text-navy">
                    {formatCurrency(p.target, { compact: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Admin;
