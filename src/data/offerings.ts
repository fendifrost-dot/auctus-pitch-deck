/**
 * Types + constants shared across the app.
 *
 * The OFFERINGS array used to live here as hardcoded mock data; it's been
 * removed now that offerings come from Supabase (see src/hooks/useOfferings.ts).
 * These type definitions are still the single source of truth for how the UI
 * renders an offering, so keep them stable.
 */

export type Sector = 'Consumer' | 'Industrial' | 'Software' | 'Logistics';
export type OfferingStatus = 'Open' | 'Closing Soon' | 'Funded' | 'Draft';

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
}

export interface Document {
  name: string;
  type: 'PPM' | 'Subscription Agreement' | 'Financials' | 'Pitch Deck' | 'Form D';
  size: string;
}

export interface Offering {
  id: string;
  company: string;
  ticker: string;
  sector: Sector;
  tagline: string;
  description: string;
  longDescription: string;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  sharePrice: number;
  status: OfferingStatus;
  closingDate: string;
  investorCount: number;
  team: TeamMember[];
  highlights: { label: string; value: string }[];
  documents: Document[];
  location: string;
  founded: number;
}

export const SECTORS: Sector[] = ['Consumer', 'Industrial', 'Software', 'Logistics'];

export const formatCurrency = (n: number, opts: { compact?: boolean } = {}) => {
  if (opts.compact && n >= 1000) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    return `$${(n / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
};
