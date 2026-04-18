import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wordmark } from './Wordmark';
import { useAuth, UserRole } from '@/context/AuthContext';
import { DemoBanner } from './DemoBanner';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  TrendingUp,
  ListChecks,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  investor: [
    { label: 'Portfolio', to: '/dashboard/investor', icon: LayoutDashboard },
    { label: 'Browse Offerings', to: '/invest', icon: Briefcase },
    { label: 'Documents', to: '/dashboard/investor#documents', icon: FileText },
  ],
  issuer: [
    { label: 'Overview', to: '/dashboard/issuer', icon: LayoutDashboard },
    { label: 'Investor Activity', to: '/dashboard/issuer#activity', icon: TrendingUp },
    { label: 'Compliance', to: '/dashboard/issuer#compliance', icon: ListChecks },
    { label: 'Documents', to: '/dashboard/issuer#documents', icon: FileText },
  ],
  admin: [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Issuers', to: '/admin/issuers', icon: Building2 },
    { label: 'Offerings', to: '/admin/offerings', icon: Briefcase },
    { label: 'Users', to: '/admin/issuers', icon: Users },
    { label: 'Settings', to: '/admin', icon: Settings },
  ],
};

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showDemoBanner?: boolean;
  actions?: ReactNode;
}

export function DashboardShell({ children, title, subtitle, showDemoBanner, actions }: Props) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = user ? NAV_BY_ROLE[user.role] : [];
  const roleLabel =
    user?.role === 'admin' ? 'Administrator' : user?.role === 'issuer' ? 'Issuer' : 'Investor';

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-navy text-cream/90 border-r border-navy-soft">
        <div className="px-6 h-16 flex items-center border-b border-navy-soft">
          <Wordmark variant="light" />
        </div>
        <div className="px-4 py-6 space-y-1 flex-1">
          <p className="px-3 mb-3 eyebrow text-cream/40">{roleLabel}</p>
          {items.map((item) => {
            const active =
              item.to === location.pathname ||
              (item.to !== '/' && location.pathname.startsWith(item.to.split('#')[0]) && item.to.split('#')[0] === location.pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors',
                  active
                    ? 'bg-navy-soft text-cream border-l-2 border-gold pl-[10px]'
                    : 'text-cream/70 hover:text-cream hover:bg-navy-soft/60',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="px-4 py-4 border-t border-navy-soft">
          {user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm text-cream font-medium">{user.name}</p>
              <p className="text-[11px] text-cream/50 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-cream/60 hover:text-gold transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {showDemoBanner && <DemoBanner />}
        {/* Mobile top bar */}
        <div className="lg:hidden h-14 px-4 flex items-center justify-between bg-navy text-cream border-b border-navy-soft">
          <Wordmark variant="light" />
          <Button
            variant="ghost"
            size="sm"
            className="text-cream hover:bg-navy-soft hover:text-cream"
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <header className="border-b border-border/70 bg-cream">
          <div className="px-6 lg:px-10 py-7 flex items-start justify-between gap-6 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2 eyebrow">
                <ShieldCheck className="h-3 w-3 text-gold" />
                {roleLabel} Dashboard
              </div>
              <h1 className="font-serif text-3xl text-navy">{title}</h1>
              {subtitle && <p className="text-muted-foreground text-sm max-w-2xl">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </header>

        <div className="px-6 lg:px-10 py-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
