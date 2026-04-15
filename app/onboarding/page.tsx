'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { browserClient } from '@/lib/supabase/client';

const DISCIPLINES = [
  {
    slug: 'product',
    name: 'Product Design',
    description: 'UX strategy, research & systems',
    color: '#8B5CF6',
    emoji: '📦',
  },
  {
    slug: 'ux',
    name: 'UX Design',
    description: 'User research, flows & wireframes',
    color: '#EF4444',
    emoji: '🔍',
  },
  {
    slug: 'ui',
    name: 'UI Design',
    description: 'Visual interfaces & design systems',
    color: '#14B8A6',
    emoji: '🎨',
  },
  {
    slug: 'graphic',
    name: 'Graphic Design',
    description: 'Branding, print & visual identity',
    color: '#F97316',
    emoji: '✏️',
  },
  {
    slug: 'motion',
    name: 'Motion Design',
    description: 'Animation, transitions & video',
    color: '#10B981',
    emoji: '🎬',
  },
  {
    slug: 'interaction',
    name: 'Interaction Design',
    description: 'Prototyping & micro-interactions',
    color: '#FBBF24',
    emoji: '⚡',
  },
  {
    slug: 'ai',
    name: 'AI & Design',
    description: 'Generative AI tools & AI-powered UX',
    color: '#06B6D4',
    emoji: '🤖',
  },
  {
    slug: 'visual',
    name: 'Visual Design',
    description: 'Illustration, photo & art direction',
    color: '#EC4899',
    emoji: '🖼️',
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  };

  const handleContinue = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await browserClient.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const res = await fetch('/api/user/disciplines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disciplines: Array.from(selected) }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Failed to save preferences. Please try again.');
        return;
      }

      router.push('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const count = selected.size;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-14">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E94560]">
          <Sparkles className="size-4 text-white" />
        </div>
        <span className="font-bold text-lg text-foreground">DesignPulse</span>
      </div>

      <div className="w-full max-w-2xl">

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-10">
          <div className="h-1 w-8 rounded-full bg-[#E94560]/30" />
          <div className="h-1 flex-1 rounded-full bg-[#E94560]" />
          <span className="text-xs text-muted-foreground ml-1">Step 2 of 2</span>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            What&apos;s your design specialty?
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Pick one or more — we&apos;ll personalise your feed based on your interests.
            You can update this any time from your account settings.
          </p>
        </div>

        {/* Discipline grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {DISCIPLINES.map((d) => {
            const isSelected = selected.has(d.slug);
            return (
              <button
                key={d.slug}
                onClick={() => toggle(d.slug)}
                className={cn(
                  'relative flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left',
                  'hover:shadow-md',
                  isSelected
                    ? 'shadow-sm'
                    : 'border-border bg-card hover:bg-muted/20'
                )}
                style={
                  isSelected
                    ? {
                        borderColor: d.color + '60',
                        backgroundColor: d.color + '10',
                      }
                    : {}
                }
              >
                {/* Check badge */}
                {isSelected && (
                  <span
                    className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: d.color }}
                  >
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  </span>
                )}

                <span className="text-xl leading-none">{d.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{d.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{d.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-[#E94560] mb-4">{error}</p>
        )}

        {/* CTA */}
        <Button
          onClick={handleContinue}
          disabled={count === 0 || loading}
          className="w-full h-11 bg-[#E94560] hover:bg-[#E94560]/90 text-white text-sm font-semibold"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : count === 0 ? (
            'Select at least one specialty'
          ) : (
            `Continue with ${count} discipline${count !== 1 ? 's' : ''} →`
          )}
        </Button>

        {/* Skip */}
        <button
          onClick={() => router.push('/')}
          className="w-full mt-3 text-xs text-center text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
