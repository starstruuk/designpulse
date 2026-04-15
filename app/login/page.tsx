'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye, EyeOff, Mail, Lock, User, Sparkles,
  ArrowLeft, Loader2, Zap, BookOpen, Wrench, CalendarDays,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { browserClient } from '@/lib/supabase/client';

type AuthTab = 'signin' | 'signup' | 'magic';

const FEATURES = [
  { icon: BookOpen,    label: 'Curated articles from 50+ design publications' },
  { icon: Wrench,      label: 'Tools & resources directory, reviewed by designers' },
  { icon: CalendarDays,label: 'Design events, workshops, and live streams' },
  { icon: Zap,         label: 'Personalized feed based on your discipline' },
];

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab]                         = useState<AuthTab>('signin');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [name, setName]                       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState<string | null>(null);
  const [success, setSuccess]                 = useState<string | null>(null);

  const clearState = () => { setError(null); setSuccess(null); };

  // ── Sign in ──────────────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearState();
    const { error: err } = await browserClient.auth.signInWithPassword({ email, password });
    if (err) { setLoading(false); setError(err.message); return; }

    // Redirect new users (no disciplines saved) to onboarding
    const params = new URLSearchParams(window.location.search);
    const next   = params.get('next') ?? '/';
    try {
      const res  = await fetch('/api/user/disciplines');
      const data = await res.json() as { disciplines?: string[] };
      const hasOnboarded = Array.isArray(data.disciplines) && data.disciplines.length > 0;
      router.push(hasOnboarded ? next : '/onboarding');
    } catch {
      router.push(next);
    }
    router.refresh();
    setLoading(false);
  };

  // ── Sign up ──────────────────────────────────────────────────────
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    clearState();
    const { data, error: err } = await browserClient.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/onboarding`,
      },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (data.session) {
      // Email confirmation disabled — auto-confirmed, go straight to onboarding
      router.push('/onboarding');
    } else {
      // Email confirmation required — ask user to check inbox
      setSuccess('Check your email to confirm your account, then sign in.');
    }
  };

  // ── Magic link ───────────────────────────────────────────────────
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearState();
    const { error: err } = await browserClient.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/`,
      },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess('Check your email — we sent you a sign-in link.');
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left branded panel (desktop only) ── */}
      <div
        className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1A1A2E 0%, #0F3460 55%, #E94560 160%)',
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white/50 hover:text-white/90 text-sm transition-colors w-fit"
        >
          <ArrowLeft className="size-4" />
          Back to feed
        </Link>

        {/* Brand + pitch */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E94560]">
              <Sparkles className="size-6 text-white" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">DesignPulse</span>
          </div>

          <h1 className="text-4xl font-bold text-white leading-[1.15] mb-5">
            Design intelligence,<br />curated daily.
          </h1>
          <p className="text-white/55 text-base leading-relaxed mb-10 max-w-xs">
            The feed for designers who want to stay sharp — articles, tools, events, and opinions all in one place.
          </p>

          <ul className="flex flex-col gap-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/8 shrink-0">
                  <Icon className="size-3.5 text-white/70" />
                </div>
                <span className="text-white/70 text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-white/25 text-xs">© 2025 DesignPulse</p>

        {/* Decorative blobs */}
        <div className="absolute -bottom-40 -right-40 w-md h-112 rounded-full bg-[#E94560]/12 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-[#6C63FF]/10 blur-2xl pointer-events-none" />
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-[#00D2FF]/8 blur-2xl pointer-events-none" />
      </div>

      {/* ── Right auth panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background relative">

        {/* Mobile: back + logo */}
        <div className="absolute top-5 left-5 lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>

        <div className="w-full max-w-90">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E94560]">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="font-bold text-lg">DesignPulse</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-muted/40 rounded-xl p-1 mb-8">
            {([
              ['signin', 'Sign In'],
              ['signup', 'Sign Up'],
              ['magic',  'Magic Link'],
            ] as [AuthTab, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => { setTab(t); clearState(); }}
                className={cn(
                  'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                  tab === t
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Sign In form ── */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-foreground">Welcome back</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Sign in to your DesignPulse account.</p>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {error && <p className="text-sm text-[#E94560]">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E94560] hover:bg-[#E94560]/90 text-white"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : 'Sign In'}
              </Button>

              <button
                type="button"
                className="text-xs text-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => { setTab('magic'); clearState(); }}
              >
                Forgot password? Use a magic link instead →
              </button>
            </form>
          )}

          {/* ── Sign Up form ── */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-foreground">Create account</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Free forever. No credit card required.</p>
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9"
                  autoComplete="name"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password (min. 8 characters)"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-9"
                  autoComplete="new-password"
                />
              </div>

              {error && <p className="text-sm text-[#E94560]">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E94560] hover:bg-[#E94560]/90 text-white"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : 'Create Account'}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                By creating an account you agree to our{' '}
                <span className="underline cursor-pointer hover:text-foreground">Terms</span> and{' '}
                <span className="underline cursor-pointer hover:text-foreground">Privacy Policy</span>.
              </p>
            </form>
          )}

          {/* ── Magic Link form ── */}
          {tab === 'magic' && (
            <form onSubmit={handleMagicLink} className="flex flex-col gap-4">
              <div className="mb-1">
                <h2 className="text-xl font-semibold text-foreground">Magic Link</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  We&apos;ll email you a sign-in link — no password needed.
                </p>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                  disabled={!!success}
                />
              </div>

              {error   && <p className="text-sm text-[#E94560]">{error}</p>}
              {success && (
                <div className="rounded-lg px-4 py-3 bg-[#00B894]/10 border border-[#00B894]/25">
                  <p className="text-sm text-[#00B894] font-medium">{success}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the link in your email to sign in. You can close this tab.
                  </p>
                </div>
              )}

              {!success && (
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E94560] hover:bg-[#E94560]/90 text-white"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : 'Send Magic Link'}
                </Button>
              )}

              {success && (
                <button
                  type="button"
                  onClick={() => { setSuccess(null); setEmail(''); }}
                  className="text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send to a different email
                </button>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Link
            href="/"
            className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue browsing as guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
