import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteShell } from '@/components/SiteShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check, Upload, FileText, Building2, Briefcase, FileCheck2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SECTORS } from '@/data/offerings';

const STEPS = [
  { key: 'company', label: 'Company', icon: Building2 },
  { key: 'business', label: 'Business', icon: Briefcase },
  { key: 'offering', label: 'Offering', icon: FileText },
  { key: 'documents', label: 'Documents', icon: FileCheck2 },
] as const;

type StepKey = typeof STEPS[number]['key'];

const OnboardIssuer = () => {
  const navigate = useNavigate();
  const [stepIdx, setStepIdx] = useState(0);
  const step: StepKey = STEPS[stepIdx].key;

  const [data, setData] = useState({
    companyName: '',
    legalEntity: '',
    location: '',
    founded: '',
    website: '',
    sector: '',
    description: '',
    teamSize: '',
    targetAmount: '',
    sharePrice: '',
    minInvestment: '25000',
  });

  const upd = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const next = () => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  const prev = () => setStepIdx((i) => Math.max(i - 1, 0));

  const submit = () => {
    toast.success('Application submitted to AUCTUS underwriting.');
    navigate('/dashboard/issuer');
  };

  return (
    <SiteShell showDemoBanner demoMessage="DEMO — Application data is not stored.">
      <section className="bg-cream py-12">
        <div className="container max-w-4xl">
          <div className="mb-10">
            <p className="eyebrow mb-2">Issuer Onboarding</p>
            <h1 className="font-serif text-4xl text-navy mb-2">Apply to raise on AUCTUS</h1>
            <p className="text-muted-foreground">
              Underwriting decision typically within 14 business days.
            </p>
          </div>

          {/* Stepper */}
          <ol className="grid grid-cols-4 gap-px bg-border border border-border mb-8">
            {STEPS.map((s, i) => {
              const active = i === stepIdx;
              const done = i < stepIdx;
              const Icon = s.icon;
              return (
                <li
                  key={s.key}
                  className={cn(
                    'p-4 bg-white flex items-center gap-3 text-sm',
                    active && 'bg-navy text-cream',
                    done && 'bg-cream-deep',
                  )}
                >
                  <div
                    className={cn(
                      'h-7 w-7 rounded-full flex items-center justify-center text-xs',
                      active && 'bg-gold text-navy',
                      done && 'bg-gold text-navy',
                      !active && !done && 'bg-cream-deep text-muted-foreground',
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                  </div>
                  <span className={cn('font-medium', active ? 'text-cream' : 'text-navy')}>
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="bg-white border border-border p-8 shadow-card">
            {step === 'company' && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-navy mb-2">Company details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Company name">
                    <Input value={data.companyName} onChange={(e) => upd('companyName', e.target.value)} placeholder="Summit Ridge Coffee Co." />
                  </Field>
                  <Field label="Legal entity">
                    <Input value={data.legalEntity} onChange={(e) => upd('legalEntity', e.target.value)} placeholder="Delaware C-Corp" />
                  </Field>
                  <Field label="Headquarters">
                    <Input value={data.location} onChange={(e) => upd('location', e.target.value)} placeholder="Portland, OR" />
                  </Field>
                  <Field label="Year founded">
                    <Input type="number" value={data.founded} onChange={(e) => upd('founded', e.target.value)} placeholder="2017" />
                  </Field>
                  <Field label="Website" className="sm:col-span-2">
                    <Input value={data.website} onChange={(e) => upd('website', e.target.value)} placeholder="https://example.com" />
                  </Field>
                </div>
              </div>
            )}

            {step === 'business' && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-navy mb-2">Business description</h2>
                <Field label="Sector">
                  <Select value={data.sector} onValueChange={(v) => upd('sector', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Business description">
                  <Textarea
                    rows={6}
                    placeholder="Describe what the company does, its market, and what makes it differentiated."
                    value={data.description}
                    onChange={(e) => upd('description', e.target.value)}
                  />
                </Field>
                <Field label="Team size">
                  <Input type="number" value={data.teamSize} onChange={(e) => upd('teamSize', e.target.value)} placeholder="12" />
                </Field>
              </div>
            )}

            {step === 'offering' && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-navy mb-2">Offering parameters</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Field label="Target raise (USD)">
                    <Input type="number" value={data.targetAmount} onChange={(e) => upd('targetAmount', e.target.value)} placeholder="500000" />
                  </Field>
                  <Field label="Share price (USD)">
                    <Input type="number" step="0.01" value={data.sharePrice} onChange={(e) => upd('sharePrice', e.target.value)} placeholder="12.50" />
                  </Field>
                  <Field label="Min investment (USD)">
                    <Input type="number" value={data.minInvestment} onChange={(e) => upd('minInvestment', e.target.value)} />
                  </Field>
                </div>
                <p className="text-xs text-muted-foreground">
                  AUCTUS recommends a minimum subscription of $25,000 for 506(c) offerings.
                </p>
              </div>
            )}

            {step === 'documents' && (
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-navy mb-2">Supporting documents</h2>
                <p className="text-sm text-muted-foreground">
                  Upload financials and supporting materials. PPM and Form D will be generated by AUCTUS.
                </p>
                <div className="grid gap-3">
                  {['Financial statements (3 years)', 'Cap table', 'Pitch deck', 'Articles of incorporation'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="border border-dashed border-border p-5 flex items-center gap-4 text-left hover:border-gold transition-colors group"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground group-hover:text-gold" />
                      <div className="flex-1">
                        <p className="text-sm text-navy font-medium">{d}</p>
                        <p className="text-xs text-muted-foreground">Click to upload · PDF, XLSX</p>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Optional</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="hairline mt-8 mb-6" />

            <div className="flex justify-between">
              <Button variant="ghost" onClick={prev} disabled={stepIdx === 0}>
                Back
              </Button>
              {stepIdx === STEPS.length - 1 ? (
                <Button variant="primary" onClick={submit}>
                  Submit application
                </Button>
              ) : (
                <Button variant="primary" onClick={next}>
                  Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="eyebrow">{label}</Label>
      {children}
    </div>
  );
}

export default OnboardIssuer;
