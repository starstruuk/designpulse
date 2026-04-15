'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

const NAV_COLS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Feed',      href: '/'          },
      { label: 'Resources', href: '/resources' },
      { label: 'Events',    href: '/events'    },
      { label: 'Opinion',   href: '/opinion'   },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign In',    href: '/login'      },
      { label: 'Sign Up',    href: '/login'      },
      { label: 'Bookmarks',  href: '/bookmarks'  },
      { label: 'Settings',   href: '/account'    },
    ],
  },
];

// ── Inline subscribe widget ───────────────────────────────────────────────────

function NewsletterWidget() {
  const [email,   setEmail]   = useState('');
  const [state,   setState]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === 'loading') return;
    setState('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setState('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrMsg(data.error ?? 'Something went wrong. Please try again.');
        setState('error');
      }
    } catch {
      setErrMsg('Network error. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="flex items-start gap-3 py-2">
        <CheckCircle2 className="size-5 text-[#22C55E] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">You&apos;re in!</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Check your inbox for a confirmation email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
            disabled={state === 'loading'}
            className="w-full h-9 pl-8 pr-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#E94560]/30 focus:border-[#E94560]/60 transition-colors disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={state === 'loading' || !email.trim()}
          className="h-9 px-3.5 rounded-lg bg-[#E94560] hover:bg-[#E94560]/90 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shrink-0"
        >
          {state === 'loading' ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <>Subscribe <ArrowRight className="size-3" /></>
          )}
        </button>
      </div>
      {state === 'error' && (
        <p className="text-xs text-[#E94560]">{errMsg}</p>
      )}
    </form>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand + newsletter */}
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div>
              <Link href="/" className="font-bold text-[#E94560] text-lg">
                DesignPulse
              </Link>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-xs">
                Design intelligence, curated daily — articles, tools, events, and opinions for working designers.
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Weekly digest
              </p>
              <NewsletterWidget />
              <p className="text-[11px] text-muted-foreground/70">
                Every Thursday. No spam, unsubscribe any time.
              </p>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DesignPulse. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
