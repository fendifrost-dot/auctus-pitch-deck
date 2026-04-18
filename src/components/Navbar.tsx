import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Wordmark } from './Wordmark';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Invest', to: '/invest' },
  { label: 'Raise Capital', to: '/raise' },
];

export function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const dashHref =
    user?.role === 'admin'
      ? '/admin'
      : user?.role === 'issuer'
        ? '/dashboard/issuer'
        : '/dashboard/investor';

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Wordmark />
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  'text-sm tracking-wide transition-colors',
                  location.pathname.startsWith(l.to)
                    ? 'text-navy font-medium'
                    : 'text-muted-foreground hover:text-navy',
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-cream text-xs font-medium uppercase">
                    {user.name.slice(0, 2)}
                  </span>
                  <span className="text-sm">{user.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs uppercase tracking-wide text-muted-foreground">
                  Signed in · {user.role}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(dashHref)}>
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild variant="primary" size="sm">
                <Link to="/signup">Open Account</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/70 bg-cream">
          <div className="container flex flex-col py-4 gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-navy"
              >
                {l.label}
              </Link>
            ))}
            <div className="hairline my-2" />
            {user ? (
              <>
                <Link to={dashHref} className="py-2" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                <button
                  className="text-left py-2 text-muted-foreground"
                  onClick={async () => {
                    await signOut();
                    setMobileOpen(false);
                    navigate('/');
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Button asChild variant="ghost" size="sm" className="flex-1">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
                </Button>
                <Button asChild variant="primary" size="sm" className="flex-1">
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>Open Account</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
