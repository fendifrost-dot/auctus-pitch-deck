import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Offering, Sector, OfferingStatus, TeamMember, Document } from '@/data/offerings';

/**
 * Offerings hooks — read from Supabase, shape the result to match the
 * existing TS `Offering` type so pages built against the mock data
 * continue to render without JSX changes.
 *
 * Numeric columns (target_amount, raised_amount, min_investment, share_price,
 * amount) come back from PostgREST as strings when they're numeric(14,2).
 * We convert to numbers in the mapper.
 */

interface OfferingRow {
  id: string;
  slug: string;
  ticker: string | null;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  target_amount: string | number;
  min_investment: string | number;
  share_price: string | number | null;
  status: string;
  closing_date: string | null;
  published: boolean;
  published_at: string | null;
  issuer: {
    id: string;
    slug: string;
    company_name: string;
    sector: string | null;
    location: string | null;
    founded: number | null;
  } | null;
  team: Array<{ id: string; name: string; title: string | null; bio: string | null; display_order: number }>;
  highlights: Array<{ id: string; label: string; value: string; display_order: number }>;
  documents: Array<{
    id: string;
    name: string;
    doc_type: string;
    size_bytes: number | null;
    visibility: string;
  }>;
  investments: Array<{ amount: string | number; status: string; investor_id: string }>;
}

const OFFERING_SELECT = `
  id, slug, ticker, tagline, description, long_description,
  target_amount, min_investment, share_price, status,
  closing_date, published, published_at,
  issuer:issuers!inner(id, slug, company_name, sector, location, founded),
  team:offering_team_members(id, name, title, bio, display_order),
  highlights:offering_highlights(id, label, value, display_order),
  documents:offering_documents(id, name, doc_type, size_bytes, visibility),
  investments(amount, status, investor_id)
`;

const toNumber = (v: string | number | null | undefined) => {
  if (v === null || v === undefined) return 0;
  return typeof v === 'string' ? parseFloat(v) : v;
};

function mapStatus(s: string): OfferingStatus {
  if (s === 'closing_soon') return 'Closing Soon';
  if (s === 'funded') return 'Funded';
  if (s === 'draft' || s === 'pending_review' || s === 'rejected' || s === 'closed') return 'Draft';
  return 'Open';
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—';
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  if (bytes >= 1000) return `${Math.round(bytes / 1000)} KB`;
  return `${bytes} B`;
}

function mapRowToOffering(row: OfferingRow): Offering {
  const raisedAmount = row.investments
    .filter((i) => i.status === 'committed' || i.status === 'funded')
    .reduce((sum, i) => sum + toNumber(i.amount), 0);
  const investorCount = new Set(
    row.investments.filter((i) => i.status !== 'cancelled').map((i) => i.investor_id),
  ).size;

  return {
    id: row.slug,
    company: row.issuer?.company_name ?? 'Unknown',
    ticker: row.ticker ?? '',
    sector: (row.issuer?.sector as Sector) ?? 'Other',
    tagline: row.tagline ?? '',
    description: row.description ?? '',
    longDescription: row.long_description ?? '',
    targetAmount: toNumber(row.target_amount),
    raisedAmount,
    minInvestment: toNumber(row.min_investment),
    sharePrice: toNumber(row.share_price),
    status: mapStatus(row.status),
    closingDate: row.closing_date ?? '',
    investorCount,
    location: row.issuer?.location ?? '',
    founded: row.issuer?.founded ?? 0,
    team: [...row.team]
      .sort((a, b) => a.display_order - b.display_order)
      .map<TeamMember>((t) => ({ name: t.name, title: t.title ?? '', bio: t.bio ?? '' })),
    highlights: [...row.highlights]
      .sort((a, b) => a.display_order - b.display_order)
      .map((h) => ({ label: h.label, value: h.value })),
    documents: row.documents.map<Document>((d) => ({
      name: d.name,
      type: d.doc_type as Document['type'],
      size: formatSize(d.size_bytes),
    })),
  };
}

export function useOfferings() {
  return useQuery({
    queryKey: ['offerings', 'published'],
    queryFn: async (): Promise<Offering[]> => {
      const { data, error } = await supabase
        .from('offerings')
        .select(OFFERING_SELECT)
        .eq('published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as OfferingRow[]).map(mapRowToOffering);
    },
  });
}

export function useOffering(slug: string | undefined) {
  return useQuery({
    queryKey: ['offering', slug],
    enabled: !!slug,
    queryFn: async (): Promise<Offering | null> => {
      const { data, error } = await supabase
        .from('offerings')
        .select(OFFERING_SELECT)
        .eq('slug', slug!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapRowToOffering(data as unknown as OfferingRow);
    },
  });
}

/**
 * Admin-only: fetch ALL offerings regardless of published flag.
 * RLS already restricts this query to admin role — non-admin users
 * will see the published subset anyway.
 */
export function useAllOfferings() {
  return useQuery({
    queryKey: ['offerings', 'all'],
    queryFn: async (): Promise<Offering[]> => {
      const { data, error } = await supabase
        .from('offerings')
        .select(OFFERING_SELECT)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as OfferingRow[]).map(mapRowToOffering);
    },
  });
}

/**
 * Used by IssuerDashboard: fetch the primary offering for the current
 * user's issuer (via issuer_members). Returns null if the user isn't
 * a member of any approved issuer yet.
 */
export function useMyPrimaryOffering() {
  return useQuery({
    queryKey: ['offering', 'mine'],
    queryFn: async (): Promise<Offering | null> => {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id;
      if (!userId) return null;

      const { data: members } = await supabase
        .from('issuer_members')
        .select('issuer_id')
        .eq('profile_id', userId);
      const issuerIds = (members ?? []).map((m) => m.issuer_id);
      if (issuerIds.length === 0) return null;

      const { data, error } = await supabase
        .from('offerings')
        .select(OFFERING_SELECT)
        .in('issuer_id', issuerIds)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapRowToOffering(data as unknown as OfferingRow);
    },
  });
}
