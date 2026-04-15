"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  Menu,
  X,
  Wrench,
  CalendarDays,
  MessageSquareQuote,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { browserClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const NAV_LINKS = [
  { label: "Resources", href: "/resources", icon: Wrench             },
  { label: "Events",    href: "/events",    icon: CalendarDays       },
  { label: "Opinion",   href: "/opinion",   icon: MessageSquareQuote },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <button className="p-2 rounded-md w-9 h-9" />;

  const isDark = theme === "dark";
  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-accent/10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
    </button>
  );
}

// ── User avatar / initials ────────────────────────────────────────
function getUserInitials(user: SupabaseUser): string {
  const name = user.user_metadata?.name as string | undefined;
  if (name) {
    return name
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  return (user.email?.[0] ?? 'U').toUpperCase();
}

// ── Profile dropdown ──────────────────────────────────────────────
function ProfileMenu({ user }: { user: SupabaseUser }) {
  const router                      = useRouter();
  const [open, setOpen]             = React.useState(false);
  const ref                         = React.useRef<HTMLDivElement>(null);
  const initials                    = getUserInitials(user);

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    await browserClient.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1.5 px-1.5 py-1.5 rounded-lg transition-colors',
          open ? 'bg-accent/10' : 'hover:bg-accent/10'
        )}
        aria-label="Profile menu"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E94560] text-white text-xs font-semibold shrink-0 select-none">
          {initials}
        </div>
        <ChevronDown
          className={cn(
            'size-3 text-muted-foreground transition-transform hidden md:block',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-card shadow-lg shadow-black/10 dark:shadow-black/30 py-1.5 z-50">
          {/* User info */}
          <div className="px-4 py-2.5 border-b border-border mb-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {(user.user_metadata?.name as string) || 'Designer'}
            </p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <button
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
            onClick={() => { setOpen(false); router.push('/account'); }}
          >
            <Settings className="size-4" />
            Account
          </button>

          <div className="my-1 border-t border-border" />

          <button
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-[#E94560] hover:bg-[#E94560]/8 transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname                    = usePathname();
  const router                      = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [authUser, setAuthUser]     = React.useState<SupabaseUser | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // ── Auth state ─────────────────────────────────────────────────
  React.useEffect(() => {
    browserClient.auth.getSession().then(({ data }) => {
      setAuthUser(data.session?.user ?? null);
    });

    const { data: { subscription } } = browserClient.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close drawer on route change
  React.useEffect(() => { setDrawerOpen(false); }, [pathname]);

  // Lock body scroll when drawer open
  React.useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close on Escape
  React.useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [drawerOpen]);

  return (
    <>
      <nav className="sticky top-0 h-16 w-full z-50 bg-white dark:bg-[#0F3460] border-b border-[#E5E7EB] dark:border-[#0F3460]/60">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-4">

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent/10 shrink-0"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="font-bold text-[#E94560] text-lg shrink-0">
            DesignPulse
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-3 py-1.5 rounded-md text-sm font-semibold transition-colors",
                    isActive
                      ? "text-[#E94560] bg-[#E94560]/10"
                      : "text-muted-foreground font-medium hover:text-foreground hover:bg-accent"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#E94560]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search — desktop only */}
          <div className="flex-1 hidden md:flex justify-center">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery('');
                  }
                }}
                placeholder="Search articles and tools..."
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/30 focus:border-[#E94560]/60 transition-colors"
              />
            </div>
          </div>

          {/* Right: theme toggle + auth */}
          <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
            <ThemeToggle />
            {authUser ? (
              <ProfileMenu user={authUser} />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-70 flex flex-col",
          "bg-white dark:bg-[#16213E] border-r border-border shadow-xl",
          "transition-transform duration-300 md:hidden",
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border shrink-0">
          <span className="font-bold text-[#E94560] text-lg">DesignPulse</span>
          <button
            className="p-2 rounded-md hover:bg-accent/10"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Drawer search */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                  setSearchQuery('');
                  setDrawerOpen(false);
                }
              }}
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/30 focus:border-[#E94560]/60"
            />
          </div>
        </div>

        {/* Drawer nav */}
        <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#E94560]/10 text-[#E94560]"
                    : "text-foreground hover:bg-accent"
                )}
              >
                <Icon className={cn("size-5", isActive ? "text-[#E94560]" : "text-muted-foreground")} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E94560]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer — auth */}
        <div className="p-4 border-t border-border shrink-0">
          {authUser ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#E94560] text-white text-sm font-semibold shrink-0">
                {getUserInitials(authUser)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {(authUser.user_metadata?.name as string) || 'Designer'}
                </p>
                <p className="text-xs text-muted-foreground truncate">{authUser.email}</p>
              </div>
              <button
                onClick={async () => {
                  await browserClient.auth.signOut();
                  setDrawerOpen(false);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:text-[#E94560] hover:bg-[#E94560]/10 transition-colors"
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <Button
              className="w-full bg-[#E94560] hover:bg-[#E94560]/90 text-white"
              asChild
            >
              <Link href="/login">
                <User className="size-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
