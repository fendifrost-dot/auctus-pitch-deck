import { DashboardShell } from '@/components/DashboardShell';
import { formatCurrency } from '@/data/offerings';
import { useOfferings } from '@/hooks/useOfferings';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Download } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const chartData = [
  { month: 'Nov', value: 175_000 },
  { month: 'Dec', value: 178_400 },
  { month: 'Jan', value: 184_200 },
  { month: 'Feb', value: 181_900 },
  { month: 'Mar', value: 188_600 },
  { month: 'Apr', value: 196_300 },
  { month: 'May', value: 203_750 },
];

const InvestorDashboard = () => {
  const { data: offerings = [] } = useOfferings();
  // Demo positions: first 3 published offerings + mock amounts (placeholder
  // until we wire real investments table reads for the signed-in investor).
  const positionTemplate: { invested: number; status: string; date: string }[] = [
    { invested: 50_000, status: 'Closed', date: '2025-03-12' },
    { invested: 100_000, status: 'Closed', date: '2025-04-02' },
    { invested: 25_000, status: 'Pending', date: '2025-05-08' },
  ];
  const positions = offerings.slice(0, 3).map((offering, i) => ({
    offering,
    ...positionTemplate[i],
  }));
  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const currentValue = chartData[chartData.length - 1].value;
  const returnPct = ((currentValue - totalInvested) / totalInvested) * 100;

  return (
    <DashboardShell
      title="Portfolio"
      subtitle="Active subscriptions, returns, and document vault."
      showDemoBanner
      actions={
        <Button asChild variant="primary">
          <Link to="/invest">Browse offerings <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      }
    >
      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-10">
        {[
          { label: 'Total Invested', value: formatCurrency(totalInvested) },
          { label: 'Current Value', value: formatCurrency(currentValue) },
          { label: 'Total Return', value: `+${returnPct.toFixed(1)}%`, accent: true },
          { label: 'Active Positions', value: positions.length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6">
            <p className="eyebrow mb-2">{s.label}</p>
            <p className={`stat-number text-2xl ${s.accent ? 'text-success' : 'text-navy'}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-border p-6 mb-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Portfolio value</p>
            <p className="font-serif text-2xl text-navy">Performance</p>
          </div>
          <p className="text-xs text-muted-foreground">Trailing 7 months · Mock data</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--navy))',
                  color: 'hsl(var(--cream))',
                  border: 'none',
                  fontSize: 12,
                }}
                labelStyle={{ color: 'hsl(var(--cream) / 0.6)' }}
                formatter={(v: number) => formatCurrency(v)}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--gold))" strokeWidth={2} fill="url(#gold-grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Positions */}
      <div className="bg-white border border-border mb-10">
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="eyebrow">Holdings</p>
            <h2 className="font-serif text-xl text-navy">Investments</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-deep">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Issuer</th>
                <th className="px-6 py-3 font-medium">Sector</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium text-right">Invested</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.offering.id} className="border-t border-border hover:bg-cream-deep/40">
                  <td className="px-6 py-4 text-navy font-medium">{p.offering.company}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.offering.sector}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(p.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right stat-number text-navy">
                    {formatCurrency(p.invested)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] uppercase tracking-wider ${
                        p.status === 'Closed' ? 'text-success' : 'text-warning'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/invest/${p.offering.id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Documents */}
      <div id="documents" className="bg-white border border-border">
        <div className="px-6 py-5 border-b border-border">
          <p className="eyebrow">Document Vault</p>
          <h2 className="font-serif text-xl text-navy">Subscription documents & K-1s</h2>
        </div>
        <div>
          {positions.flatMap((p) =>
            p.offering.documents.slice(0, 2).map((d) => (
              <div
                key={p.offering.id + d.name}
                className="flex items-center justify-between p-4 border-t border-border"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gold" />
                  <div>
                    <p className="text-sm text-navy font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{p.offering.company} · {d.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
              </div>
            )),
          )}
        </div>
      </div>
    </DashboardShell>
  );
};

export default InvestorDashboard;
