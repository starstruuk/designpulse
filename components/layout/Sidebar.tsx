"use client";

import * as React from "react";
import {
  LayoutGrid,
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
  sortBy: "newest" | "mostRead" | "topRated";
  fromDate: string;
  toDate: string;
  tags: string[];
}

interface SidebarProps {
  filters: SidebarFilters;
  onChange: (filters: SidebarFilters) => void;
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
  { label: "Newest First", value: "newest"   },
  { label: "Most Read",    value: "mostRead" },
  { label: "Top Rated",    value: "topRated" },
] as const;

const TAGS = [
  "Spatial Design", "visionOS", "Apple", "AI Tools", "Workflow",
  "Automation", "Swiss Design", "Typography", "Grid Systems",
  "Color Theory", "Branding", "Visual Hierarchy", "Animation",
  "Easing Curves", "Transitions", "Haptics", "Gestures", "Mobile",
  "Research", "Empathy Maps", "User Testing", "Dark Mode",
  "Design Systems", "Accessibility",
];

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
 * Left sidebar with discipline filters, date range, sort, and tags.
 * Hidden below lg breakpoint.
 */
export default function Sidebar({ filters, onChange }: SidebarProps) {

  function toggleDiscipline(slug: string) {
    const current = filters.disciplines;
    const next = current.includes(slug)
      ? current.filter((d) => d !== slug)
      : [...current, slug];
    onChange({ ...filters, disciplines: next });
  }

  function toggleTag(tag: string) {
    const current = filters.tags;
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onChange({ ...filters, tags: next });
  }

  function clearAll() {
    onChange({
      disciplines: [],
      sortBy: "newest",
      fromDate: "",
      toDate: "",
      tags: [],
    });
  }

  const hasActiveFilters =
    filters.disciplines.length > 0 ||
    filters.tags.length > 0 ||
    filters.fromDate ||
    filters.toDate;

  return (
    <aside className={cn(
      "hidden lg:flex flex-col",
      "fixed left-0 top-16 w-60 h-[calc(100vh-4rem)]",
      "overflow-y-auto overscroll-contain",
      "border-r border-border bg-card",
      "z-40"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
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
      <div className="flex flex-col gap-5 px-4 py-4 flex-1">

        {/* ── Categories ── */}
        <Section title="Categories">
          <div className="flex flex-col gap-1">
            {DISCIPLINES.map(({ label, slug, icon: Icon }) => {
              const isActive = filters.disciplines.includes(slug);
              const color = DISCIPLINE_COLORS[slug];
              return (
                <button
                  key={slug}
                  onClick={() => toggleDiscipline(slug)}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-[#E94560]/10 text-[#E94560]"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  {/* Checkbox */}
                  <span className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                    isActive
                      ? "border-[#E94560] bg-[#E94560]"
                      : "border-muted-foreground"
                  )}>
                    {isActive && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  {/* Color dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <Icon
                    className="size-4 flex-shrink-0"
                    style={{ color }}
                  />
                  <span className="font-medium">{label}</span>
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
                value={filters.fromDate}
                onChange={(e) =>
                  onChange({ ...filters, fromDate: e.target.value })
                }
                className="h-8 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">To</label>
              <Input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  onChange({ ...filters, toDate: e.target.value })
                }
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
              const isActive = filters.sortBy === value;
              return (
                <button
                  key={value}
                  onClick={() => onChange({ ...filters, sortBy: value })}
                  className={cn(
                    "flex items-center gap-3 px-2 py-1.5 rounded-lg text-sm transition-colors text-left",
                    isActive
                      ? "bg-[#E94560]/10 text-[#E94560]"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <span className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                    isActive ? "border-[#E94560]" : "border-muted-foreground"
                  )}>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#E94560]" />
                    )}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </Section>

        <div className="border-t border-border" />

        {/* ── Tags ── */}
        <Section title="Tags" defaultOpen={false}>
          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((tag) => {
              const isActive = filters.tags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "text-xs rounded-full border px-2 py-0.5 transition-colors",
                    isActive
                      ? "bg-[#E94560] text-white border-[#E94560]"
                      : "border-border text-muted-foreground hover:border-[#E94560] hover:text-[#E94560]"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </Section>
      </div>
    </aside>
  );
}