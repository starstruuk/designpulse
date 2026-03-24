// components/shared/DisciplineBadge.tsx
"use client";

import { cn } from "@/lib/utils";
import { Discipline } from "@/types";
import React from "react";

interface DisciplineBadgeProps {
  discipline: Discipline;
  className?: string; // Add this line to accept the className prop
}

const colors: Record<Discipline, string> = {
  product: "#8B5CF6",
  ai: "#06B6D4",
  graphic: "#F97316",
  visual: "#EC4899",
  motion: "#10B981",
  interaction: "#FBBF24",
  ux: "#EF4444",
  ui: "#14B8A6",
};

export default function DisciplineBadge({ discipline, className }: DisciplineBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full",
        `bg-${colors[discipline]}`,
        "text-white",
        className // Use the className prop here
      )}
    >
      {discipline.toUpperCase()}
    </span>
  );
}