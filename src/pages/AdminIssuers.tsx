import { useState } from 'react';
import { DashboardShell } from '@/components/DashboardShell';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Application {
  id: string;
  company: string;
  contact: string;
  sector: string;
  target: number;
  submitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const initial: Application[] = [
  { id: 'a1', company: 'Northwind Manufacturing', contact: 'Helena Voss', sector: 'Industrial', target: 1_500_000, submitted: '2025-05-12', status: 'Pending' },
  { id: 'a2', company: 'Atlas Health Partners', contact: 'Dr. Reza Karimi', sector: 'Healthcare', target: 2_200_000, submitted: '2025-05-10', status: 'Pending' },
  { id: 'a3', company: 'Beacon Hill Spirits', contact: 'Owen Thatcher', sector: 'Consumer', target: 800_000, submitted: '2025-05-08', status: 'Pending' },
  { id: 'a4', company: 'Ridgeline Robotics', contact: 'Mira Chen', sector: 'Software', target: 1_100_000, submitted: '2025-05-04', status: 'Approved' },
  { id: 'a5', company: 'Pacific Grain Co.', contact: 'Sam Reilly', sector: 'Consumer', target: 600_000, submitted: '2025-04-29', status: 'Rejected' },
];

const AdminIssuers = () => {
  const [apps, setApps] = useState(initial);

  const setStatus = (id: string, status: Application['status']) => {
    setApps((a) => a.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success(`Application ${status.toLowerCase()}.`);
  };

  return (
    <DashboardShell title="Issuer Applications" subtitle="Approve or reject incoming raise applications.">
      <div className="bg-white border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-deep">
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Sector</th>
                <th className="px-6 py-3 font-medium text-right">Target</th>
                <th className="px-6 py-3 font-medium">Submitted</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-6 py-4 text-navy font-medium">{a.company}</td>
                  <td className="px-6 py-4 text-muted-foreground">{a.contact}</td>
                  <td className="px-6 py-4 text-muted-foreground">{a.sector}</td>
                  <td className="px-6 py-4 text-right stat-number text-navy">
                    ${(a.target / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(a.submitted).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'text-[11px] uppercase tracking-wider',
                        a.status === 'Approved' && 'text-success',
                        a.status === 'Pending' && 'text-gold',
                        a.status === 'Rejected' && 'text-destructive',
                      )}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {a.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setStatus(a.id, 'Rejected')}>
                          Reject
                        </Button>
                        <Button size="sm" variant="primary" onClick={() => setStatus(a.id, 'Approved')}>
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => setStatus(a.id, 'Pending')}>
                        Reopen
                      </Button>
                    )}
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

export default AdminIssuers;
