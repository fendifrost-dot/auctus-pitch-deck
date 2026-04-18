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

export const OFFERINGS: Offering[] = [
  {
    id: 'summit-ridge',
    company: 'Summit Ridge Coffee Co.',
    ticker: 'SRC',
    sector: 'Consumer',
    tagline: 'Regional roaster scaling into wholesale.',
    description:
      'Specialty coffee roaster expanding from 4 retail locations into regional wholesale distribution across the Pacific Northwest.',
    longDescription:
      'Summit Ridge has operated four flagship cafés in Portland and Seattle since 2017, generating $4.2M in trailing revenue with 68% gross margins. This raise funds a new 18,000 sq ft roastery and a wholesale sales team targeting 120+ regional grocery and hospitality accounts already in pilot.',
    targetAmount: 500_000,
    raisedAmount: 327_500,
    minInvestment: 25_000,
    sharePrice: 12.5,
    status: 'Open',
    closingDate: '2025-09-30',
    investorCount: 14,
    location: 'Portland, OR',
    founded: 2017,
    team: [
      { name: 'Eleanor Hayes', title: 'Founder & CEO', bio: 'Former head of coffee at Stumptown. 15 years specialty coffee.' },
      { name: 'Marcus Tan', title: 'COO', bio: 'Scaled wholesale ops at La Colombe from $8M to $40M.' },
      { name: 'Priya Shankar', title: 'CFO', bio: 'Ex-Deloitte M&A. CPA. Led 3 consumer brand exits.' },
    ],
    highlights: [
      { label: 'TTM Revenue', value: '$4.2M' },
      { label: 'Gross Margin', value: '68%' },
      { label: 'YoY Growth', value: '34%' },
      { label: 'Wholesale Pipeline', value: '120 accounts' },
    ],
    documents: [
      { name: 'Private Placement Memorandum', type: 'PPM', size: '2.4 MB' },
      { name: 'Subscription Agreement', type: 'Subscription Agreement', size: '480 KB' },
      { name: 'Audited Financials FY24', type: 'Financials', size: '1.1 MB' },
      { name: 'Investor Deck', type: 'Pitch Deck', size: '8.2 MB' },
      { name: 'Form D Filing', type: 'Form D', size: '220 KB' },
    ],
  },
  {
    id: 'meridian-industrial',
    company: 'Meridian Industrial Leasing',
    ticker: 'MIL',
    sector: 'Industrial',
    tagline: 'Roll-up acquisition of competitor equipment fleet.',
    description:
      'Established equipment leasing operator acquiring a regional competitor to expand fleet from 340 to 580 units across the Midwest.',
    longDescription:
      'Meridian leases compact construction equipment to mid-market contractors with 92% utilization across an existing 340-unit fleet. This raise finances the asset purchase of Hartmann Equipment Rental, a 240-unit competitor in Indiana and Ohio, at 4.2x EBITDA — a meaningful discount to public comps.',
    targetAmount: 1_200_000,
    raisedAmount: 840_000,
    minInvestment: 25_000,
    sharePrice: 25.0,
    status: 'Closing Soon',
    closingDate: '2025-08-15',
    investorCount: 22,
    location: 'Columbus, OH',
    founded: 2011,
    team: [
      { name: 'David Whitcomb', title: 'Managing Partner', bio: '20+ years equipment finance. Built and sold two leasing platforms.' },
      { name: 'Rachel Okonkwo', title: 'Head of Acquisitions', bio: 'Former VP at United Rentals corporate development.' },
    ],
    highlights: [
      { label: 'TTM EBITDA', value: '$2.1M' },
      { label: 'Fleet Utilization', value: '92%' },
      { label: 'Acquisition Multiple', value: '4.2x EBITDA' },
      { label: 'Targeted IRR', value: '18–22%' },
    ],
    documents: [
      { name: 'Private Placement Memorandum', type: 'PPM', size: '3.1 MB' },
      { name: 'Asset Purchase Agreement (Draft)', type: 'Subscription Agreement', size: '720 KB' },
      { name: 'Hartmann QoE Report', type: 'Financials', size: '2.8 MB' },
      { name: 'Investor Deck', type: 'Pitch Deck', size: '6.4 MB' },
    ],
  },
  {
    id: 'cascade-software',
    company: 'Cascade Software Group',
    ticker: 'CSG',
    sector: 'Software',
    tagline: 'B2B SaaS reseller consolidating fragmented accounts.',
    description:
      'Software reseller and managed services platform consolidating mid-market B2B SaaS reseller accounts across HR-tech and FinOps verticals.',
    longDescription:
      'Cascade operates a buy-and-build platform acquiring sub-scale SaaS resellers (typically $1–3M ARR) and migrating them onto a common operating, billing, and customer success stack. Three tuck-ins completed; raise funds the next two acquisitions and a unified renewals motion.',
    targetAmount: 750_000,
    raisedAmount: 412_500,
    minInvestment: 25_000,
    sharePrice: 15.0,
    status: 'Open',
    closingDate: '2025-10-20',
    investorCount: 11,
    location: 'Austin, TX',
    founded: 2020,
    team: [
      { name: 'Jonathan Reeve', title: 'CEO', bio: 'Founded and exited a $22M ARR SaaS reseller in 2019.' },
      { name: 'Anika Lindqvist', title: 'CTO', bio: 'Engineering leadership at Workday and Gainsight.' },
      { name: 'Carlos Mendez', title: 'Head of M&A', bio: 'Closed 11 software roll-up acquisitions across two prior platforms.' },
    ],
    highlights: [
      { label: 'Combined ARR', value: '$6.8M' },
      { label: 'Net Revenue Retention', value: '108%' },
      { label: 'Acquisitions Completed', value: '3' },
      { label: 'Pipeline (LOI Stage)', value: '5 targets' },
    ],
    documents: [
      { name: 'Private Placement Memorandum', type: 'PPM', size: '2.9 MB' },
      { name: 'Subscription Agreement', type: 'Subscription Agreement', size: '510 KB' },
      { name: 'Combined Financial Model', type: 'Financials', size: '1.4 MB' },
      { name: 'Investor Deck', type: 'Pitch Deck', size: '7.6 MB' },
      { name: 'Form D Filing', type: 'Form D', size: '210 KB' },
    ],
  },
  {
    id: 'greenline-logistics',
    company: 'Greenline Logistics',
    ticker: 'GLL',
    sector: 'Logistics',
    tagline: 'Last-mile fleet electrification at scale.',
    description:
      'Last-mile delivery operator electrifying a 180-vehicle fleet servicing national e-commerce contracts in the Southeast.',
    longDescription:
      'Greenline delivers ~1.8M parcels per quarter under contract with two top-five e-commerce shippers. This raise funds the conversion of 90 remaining ICE vans to electric over 18 months, capturing fuel and maintenance savings projected at $1.4M annually plus federal credits.',
    targetAmount: 900_000,
    raisedAmount: 290_000,
    minInvestment: 25_000,
    sharePrice: 18.0,
    status: 'Open',
    closingDate: '2025-11-10',
    investorCount: 8,
    location: 'Atlanta, GA',
    founded: 2018,
    team: [
      { name: 'Tomás Beltran', title: 'Founder & CEO', bio: 'Former regional director at XPO Logistics.' },
      { name: 'Kara Whitfield', title: 'COO', bio: '12 years scaling Amazon DSP partner operations.' },
    ],
    highlights: [
      { label: 'TTM Revenue', value: '$11.2M' },
      { label: 'Quarterly Parcels', value: '1.8M' },
      { label: 'Projected OpEx Savings', value: '$1.4M / yr' },
      { label: 'Federal EV Credits', value: '$680K' },
    ],
    documents: [
      { name: 'Private Placement Memorandum', type: 'PPM', size: '2.6 MB' },
      { name: 'Subscription Agreement', type: 'Subscription Agreement', size: '490 KB' },
      { name: 'Fleet Conversion Plan', type: 'Financials', size: '1.8 MB' },
      { name: 'Investor Deck', type: 'Pitch Deck', size: '9.1 MB' },
    ],
  },
];

export const SECTORS: Sector[] = ['Consumer', 'Industrial', 'Software', 'Logistics'];

export const formatCurrency = (n: number, opts: { compact?: boolean } = {}) => {
  if (opts.compact && n >= 1000) {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    return `$${(n / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
};

export const getOffering = (id: string) => OFFERINGS.find((o) => o.id === id);
