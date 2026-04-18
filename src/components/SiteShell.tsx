import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { DemoBanner } from './DemoBanner';

interface Props {
  children: ReactNode;
  showDemoBanner?: boolean;
  demoMessage?: string;
  hideFooter?: boolean;
}

export function SiteShell({ children, showDemoBanner, demoMessage, hideFooter }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {showDemoBanner && <DemoBanner message={demoMessage} />}
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
