import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardShell } from '@/components/DashboardShell';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type DbStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';

interface IssuerRow {
  id: string;
  slug: string;
  company_name: string;
  sector: string | null;
  primary_contact_id: string | null;
  application_status: DbStatus;
  application_submitted_at: string | null;
  created_at: string;
  contact_profile?: { full_name: string | null; email: string | null } | null;
  offerings: Array<{ target_amount: string | number }>;
}

const uiStatus = (s: DbStatus): 'Pending' | 'Approved' | 'Rejected' => {
  if (s === 'approved') return 'Approved';
  if (s === 'rejected') return 'Rejected';
  return 'Pending';
};

const AdminIssuers = () => {
  const qc = useQueryClient();

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ['issuers', 'admin'],
    queryFn: async (): Promise<IssuerRow[]> => {
      const { data, error } = await supabase
        .from('issuers')
        .select(
          `id, slug, company_name, sector, primary_contact_id, application_status,
           application_submitted_at, created_at,
           contact_profile:profiles!issuers_primary_contact_id_fkey(full_name, email),
           offerings(target_amount)`,
        )
        .in('application_status', ['submitted', 'under_review', 'approved', 'rejected'])
        .order('application_submitted_at', { ascending: false, nullsFirst: false });
      if (error) throw error;
      return (data ?? []) as unknown as IssuerRow[];
    },
  });

  const setStatusMutation = useMutation({
    mutationFn: async ({ id, next }: { id: string; next: DbStatus }) => {
      const update: Record<string, unknown> = {
        application_status: next,
      };
      if (next === 'approved' || next === 'rejected') {
        update.application_decided_at = new Date().toISOString();
        const { data: userRes } = await supabase.auth.getUser();
        if (userRes.user) update.application_decided_by = userRes.user.id;
      }
      const { error } = await supabase.from('issuers').update(update).eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_d, vars) => {
      const label = vars.next === 'under_review' ? 'reopened' : vars.next;
      toast.success(`Application ${label}.`);
      qc.invalidateQueries({ queryKey: ['issuers'] });
    },
    onError: (err: { message?: string }) => toast.error(err.message ?? 'Update failed.'),
  });

  return (
    <DashboardShell title="Issuer Applications" subtitle="Approve or reject incoming raise applications.">
      <div className="bg-white border border-border">
        {isLoading && <p className="p-6 text-muted-foreground">Loading applications…</p>}
        {!isLoading && (
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
                {rows.map((a) => {
                  const status = uiStatus(a.application_status);
                  const target = a.offerings[0]?.target_amount
                    ? Number(a.offerings[0].target_amount)
                    : null;
                  const submitted = a.application_submitted_at ?? a.created_at;
                  return (
                    <tr key={a.id} className="border-t border-border">
                      <td className="px-6 py-4 text-navy font-medium">{a.company_name}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {a.contact_profile?.full_name ?? a.contact_profile?.email ?? '—'}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{a.sector ?? '—'}</td>
                      <td className="px-6 py-4 text-right stat-number text-navy">
                        {target ? `$${(target / 1000).toFixed(0)}K` : '—'}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(submitted).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'text-[11px] uppercase tracking-wider',
                            status === 'Approved' && 'text-success',
                            status === 'Pending' && 'text-gold',
                            status === 'Rejected' && 'text-destructive',
                          )}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={setStatusMutation.isPending}
                              onClick={() => setStatusMutation.mutate({ id: a.id, next: 'rejected' })}
                            >
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="primary"
                              disabled={setStatusMutation.isPending}
                              onClick={() => setStatusMutation.mutate({ id: a.id, next: 'approved' })}
                            >
                              Approve
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={setStatusMutation.isPending}
                            onClick={() => setStatusMutation.mutate({ id: a.id, next: 'under_review' })}
                          >
                            Reopen
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default AdminIssuers;
