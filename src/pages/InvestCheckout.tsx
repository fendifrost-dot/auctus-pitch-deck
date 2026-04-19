import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { SiteShell } from '@/components/SiteShell';
import { formatCurrency } from '@/data/offerings';
import { useOffering } from '@/hooks/useOfferings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'amount' | 'review' | 'success';

const InvestCheckout = () => {
  const { id = '' } = useParams();
  const { data: o, isLoading } = useOffering(id);
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState<string>('');
  const [accredited, setAccredited] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const txnId = useMemo(
    () => 'TXN-' + Math.random().toString(36).slice(2, 8).toUpperCase() + '-' + Date.now().toString().slice(-6),
    [],
  );

  if (isLoading) return <SiteShell showDemoBanner><section className="py-20 text-center text-muted-foreground">Loading…</section></SiteShell>;
  if (!o) return <Navigate to="/invest" replace />;

  const numericAmount = Number(amount) || 0;
  const shares = o.sharePrice ? Math.floor(numericAmount / o.sharePrice) : 0;
  const meetsMin = numericAmount >= o.minInvestment;
  const canReview = meetsMin && accredited;

  const steps: { key: Step; label: string }[] = [
    { key: 'amount', label: 'Amount' },
    { key: 'review', label: 'Review & Sign' },
    { key: 'success', label: 'Confirmation' },
  ];

  return (
    <SiteShell showDemoBanner demoMessage="DEMO — No real subscription will be processed.">
      <section className="bg-cream py-12 min-h-[calc(100vh-200px)]">
        <div className="container max-w-3xl">
          <Link
            to={`/invest/${o.id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy text-sm mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to deal
          </Link>

          {/* Stepper */}
          <ol className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => {
              const idx = steps.findIndex((x) => x.key === step);
              const done = i < idx;
              const active = i === idx;
              return (
                <li key={s.key} className="flex items-center gap-3 flex-1">
                  <div
                    className={cn(
                      'h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border',
                      done && 'bg-gold border-gold text-navy',
                      active && 'border-navy bg-navy text-cream',
                      !done && !active && 'border-border bg-white text-muted-foreground',
                    )}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span
                    className={cn(
                      'text-xs uppercase tracking-wider',
                      active ? 'text-navy font-medium' : 'text-muted-foreground',
                    )}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
                </li>
              );
            })}
          </ol>

          {/* Card */}
          <div className="bg-white border border-border shadow-card">
            <div className="px-8 py-6 border-b border-border">
              <p className="eyebrow mb-1">Subscribing to</p>
              <h1 className="font-serif text-2xl text-navy">{o.company}</h1>
              <p className="text-sm text-muted-foreground">{o.sector} · Reg D 506(c) · ${o.sharePrice.toFixed(2)}/share</p>
            </div>

            <div className="p-8">
              {step === 'amount' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="amount" className="mb-2 block">Investment amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder={`Minimum ${formatCurrency(o.minInvestment)}`}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl h-14 stat-number"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Minimum: {formatCurrency(o.minInvestment)} · You will receive approximately{' '}
                      <span className="text-navy font-medium">{shares.toLocaleString()} shares</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[25_000, 50_000, 100_000].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setAmount(String(q))}
                        className="border border-border hover:border-gold py-3 text-sm text-navy transition-colors"
                      >
                        {formatCurrency(q, { compact: true })}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-cream-deep">
                    <Checkbox
                      id="accredited"
                      checked={accredited}
                      onCheckedChange={(v) => setAccredited(!!v)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="accredited" className="text-sm leading-relaxed text-navy cursor-pointer">
                      I confirm I am an accredited investor as defined under Rule 501(a) of
                      Regulation D and have completed AUCTUS verification.
                    </Label>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!canReview}
                    onClick={() => setStep('review')}
                  >
                    Review subscription <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <div className="border border-border">
                    {[
                      ['Issuer', o.company],
                      ['Security', 'Preferred Equity'],
                      ['Investment Amount', formatCurrency(numericAmount)],
                      ['Share Price', `$${o.sharePrice.toFixed(2)}`],
                      ['Shares Allocated', shares.toLocaleString()],
                      ['Filing', 'Reg D · Rule 506(c)'],
                    ].map(([k, v], i, arr) => (
                      <div
                        key={k}
                        className={cn(
                          'flex justify-between p-4 text-sm',
                          i !== arr.length - 1 && 'border-b border-border',
                        )}
                      >
                        <span className="text-muted-foreground">{k}</span>
                        <span className="text-navy font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(v) => setAgreeTerms(!!v)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed text-navy cursor-pointer">
                      I have reviewed the PPM, Subscription Agreement, and Form D filing, and I
                      agree to the terms of this subscription.
                    </Label>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline-navy" size="lg" className="flex-1" onClick={() => setStep('amount')}>
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={!agreeTerms}
                      onClick={() => setStep('success')}
                    >
                      Confirm subscription
                    </Button>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-6">
                  <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-gold/15 flex items-center justify-center">
                    <ShieldCheck className="h-7 w-7 text-gold" />
                  </div>
                  <h2 className="font-serif text-3xl text-navy mb-3">Subscription submitted.</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Your subscription to {o.company} has been recorded. The issuer will
                    countersign and you'll receive confirmation by email.
                  </p>
                  <div className="bg-cream-deep p-5 inline-block min-w-[280px] mb-8 text-left">
                    <p className="eyebrow mb-1">Transaction Reference</p>
                    <p className="stat-number text-navy">{txnId}</p>
                    <div className="hairline my-3" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-navy font-medium">{formatCurrency(numericAmount)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline-navy" onClick={() => navigate('/invest')}>
                      Browse more
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/dashboard/investor')}>
                      View portfolio
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};

export default InvestCheckout;
