"use client";

import * as React from "react";
import { TrendingUp, ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TRENDING_ARTICLES = [
  { id: "1", title: "Apple Vision Pro: Redefining Spatial Design",    source: "DesignBetter"  },
  { id: "2", title: "The Rise of AI-Generated Brand Identities",       source: "Brand New"     },
  { id: "3", title: "Why Variable Fonts Matter in 2026",               source: "Typewolf"      },
  { id: "4", title: "Figma's New Dev Mode Features Explained",         source: "Figma Blog"    },
  { id: "5", title: "Micro-Interactions That Delight Users",           source: "UX Collective" },
];

const FEATURED_TOOLS = [
  { name: "Framer",  description: "No-code website builder",   color: "#8B5CF6" },
  { name: "Spline",  description: "3D design for the web",     color: "#06B6D4" },
  { name: "Rive",    description: "Interactive animations",    color: "#10B981" },
  { name: "Relume",  description: "AI-powered wireframing",    color: "#F97316" },
];

/**
 * Right rail showing trending articles and featured tools.
 * Only visible on xl+ screens.
 */
export default function RightRail() {
  return (
    <aside className={cn(
      "hidden xl:flex flex-col gap-6",
      "fixed right-0 top-16 w-[280px] h-[calc(100vh-4rem)]",
      "overflow-y-auto overscroll-contain",
      "border-l border-border bg-card",
      "p-4 z-30"
    )}>
      {/* Trending Now */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <TrendingUp className="size-4 text-[#E94560]" />
          Trending Now
        </div>
        <div className="flex flex-col">
          {TRENDING_ARTICLES.map((article, index) => (
            <div
              key={article.id}
              className={cn(
                "flex items-start gap-3 py-2.5 cursor-pointer group",
                index < TRENDING_ARTICLES.length - 1 && "border-b border-border"
              )}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E94560]/10 text-[#E94560] text-xs font-semibold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium leading-snug line-clamp-2 text-foreground group-hover:text-[#E94560] transition-colors">
                  {article.title}
                </p>
                <p className="text-xs text-muted-foreground">{article.source}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Featured Tools */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ExternalLink className="size-4 text-[#E94560]" />
          Featured Tools
        </div>
        <div className="flex flex-col gap-1">
          {FEATURED_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: tool.color }}
              >
                {tool.name[0]}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{tool.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
              </div>
              <ArrowUpRight className="size-3.5 text-muted-foreground group-hover:text-[#E94560] transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}