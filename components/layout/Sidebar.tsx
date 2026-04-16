"use client";

import * as React from "react";
import {
  Cpu,
  Pen,
  Eye,
  Film,
  MousePointer,
  Users,
  Sparkles,
  Layers,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────
export interface SidebarFilters {
  disciplines: string[];
  sortBy: "newest" | "oldest";
  fromDate: string;
  toDate: string;
}

interface SidebarProps {
  filters: SidebarFilters;
  onChange: (filters: SidebarFilters) => void;
  /** Called after Apply or Clear — lets parent close mobile drawer */
  onApply?: () => void;
  /** When true, renders inline without fixed positioning (used in mobile drawer) */
  mobile?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────
const DISCIPLINES = [
  { label: "Product",     slug: "product",     icon: Layers       },
  { label: "AI",          slug: "ai",          icon: Cpu          },
  { label: "Graphic",     slug: "graphic",     icon: Pen          },
  { label: "Visual",      slug: "visual",      icon: Eye          },
  { label: "Motion",      slug: "motion",      icon: Film         },
  { label: "Interaction", slug: "interaction", icon: MousePointer },
  { label: "UX",          slug: "ux",          icon: Users        },
  { label: "UI",          slug: "ui",          icon: Sparkles     },
] as const;

const DISCIPLINE_COLORS: Record<string, string> = {
  product:     "#8B5CF6",
  ai:          "#06B6D4",
  graphic:     "#F97316",
  visual:      "#EC4899",
  motion:      "#10B981",
  interaction: "#FBBF24",
  ux:          "#EF4444",
  ui:          "#14B8A6",
};

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
] as const;

const DEFAULT_FILTERS: SidebarFilters = {
  disciplines: [],
  sortBy: "newest",
  fromDate: "",
  toDate: "",
};

// ─── Collapsible Section ─────────────────────────────────────────
function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-1"
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        {open
          ? <ChevronUp className="size-3.5 text-muted-foreground" />
          : <ChevronDown className="size-3.5 text-muted-foreground" />
        }
      </button>
      {open && children}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────
/**
 * Left sidebar with discipline filters, date range, and sort.
 * Buffers all changes locally — only calls onChange when Apply is clicked.
 * Hidden below lg breakpoint (unless mobile prop is set).
 */
export default function Sidebar({ filters, onChange, onApply, mobile = false }: SidebarProps) {
  // Buffer pending changes — applied only on Apply click
  const [pending, setPending] = React.useState<SidebarFilters>(filters);

  // Sync pending when parent filters are cleared externally (e.g. chip removal)
  React.useEffect(() => {
    setPending(filters);
  }, [filters]);

  function toggleDiscipline(slug: string) {
    setPending((prev) => ({
      ...prev,
      disciplines: prev.disciplines.includes(slug)
        ? prev.disciplines.filter((d) => d !== slug)
        : [...prev.disciplines, slug],
    }));
  }

  function clearAll() {
    setPending(DEFAULT_FILTERS);
    onChange(DEFAULT_FILTERS);
    onApply?.();
  }

  function handleApply() {
    onChange(pending);
    onApply?.();
  }

  const hasActiveFilters =
    pending.disciplines.length > 0 ||
    !!pending.fromDate ||
    !!pending.toDate ||
    pending.sortBy !== "newest";

  return (
    <aside className={cn(
      "flex flex-col",
      !mobile && "hidden lg:flex fixed left-0 top-16 w-60 h-[calc(100vh-4rem)] border-r border-border bg-card z-50",
      mobile && "w-full h-full bg-card",
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="size-4 text-[#E94560]" />
          Filter Articles
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-[#E94560] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col gap-5 px-4 py-4 flex-1 overflow-y-auto overscroll-contain">

        {/* ── Categories ── */}
        <Section title="Categories">
          <div className="flex flex-wrap gap-1.5">
            {DISCIPLINES.map(({ label, slug, icon: Icon }) => {
              const isActive = pending.disciplines.includes(slug);
              const color    = DISCIPLINE_COLORS[slug];
              return (
                <button
                  key={slug}
                  onClick={() => toggleDiscipline(slug)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                    isActive
                      ? "text-white border-transparent"
                      : "bg-muted/50 text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground/60"
                  )}
                  style={isActive ? { backgroundColor: color, borderColor: color } : {}}
                >
                  <Icon className="size-3 shrink-0" />
                  {label}
                </button>
              );
            })}
          </div>
        </Section>

        <div className="border-t border-border" />

        {/* ── Date Range ── */}
        <Section title="Date Range">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">From</label>
              <Input
                type="date"
                value={pending.fromDate}
                onChange={(e) => setPending((prev) => ({ ...prev, fromDate: e.target.value }))}
                className="h-8 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Input
                type="date"
                value={pending.toDate}
                onChange={(e) => setPending((prev) => ({ ...prev, toDate: e.target.value }))}
                className="h-8 text-xs"
              />
            </div>
          </div>
        </Section>

        <div className="border-t border-border" />

        {/* ── Sort By ── */}
        <Section title="Sort By">
          <div className="flex flex-col gap-1.5">
            {SORT_OPTIONS.map(({ label, value }) => {
              const isActive = pending.sortBy === value;
              return (
                <button
                  key={value}
                  onClick={() => setPending((prev) => ({ ...prev, sortBy: value }))}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm transition-colors text-left",
                    isActive
                      ? "bg-[#E94560]/10 text-[#E94560]"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <span className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                    isActive ? "border-[#E94560]" : "border-muted-foreground"
                  )}>
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#E94560]" />}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </Section>

      </div>

      {/* Apply — sticky footer */}
      <div className="p-3 border-t border-border bg-card shrink-0">
        <button
          onClick={handleApply}
          className="w-full py-2 rounded-lg bg-[#E94560] text-white text-sm font-medium hover:bg-[#E94560]/90 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
