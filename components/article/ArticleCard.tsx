"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import DisciplineBadge from "@/components/shared/DisciplineBadge";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

const getRelativeTime = (date: string | Date): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export default function ArticleCard({
  article,
  isBookmarked = false,
  onBookmark,
}: ArticleCardProps) {
  // disciplines come back as join table objects from the API
  const firstDisciplineSlug =
    (article.disciplines as any)?.[0]?.discipline?.slug ??
    (typeof article.disciplines?.[0] === "string"
      ? article.disciplines[0]
      : null);

  return (
    <div
      className={cn(
        "relative rounded-xl border overflow-hidden cursor-pointer",
        "bg-white border-[#E5E7EB] shadow-sm",
        "dark:bg-[#16213E] dark:border-[#0F3460]",
        "hover:border-[#E94560] hover:scale-[1.02] transition-all duration-200"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="rounded-t-xl object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-[#1F2B4A] rounded-t-xl" />
        )}
        {firstDisciplineSlug && (
          <div className="absolute bottom-2 left-2">
            <DisciplineBadge discipline={firstDisciplineSlug} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <div className="text-xs text-muted-foreground">
          {article.sourceName}
          {article.publishedAt && (
            <> &bull; {getRelativeTime(article.publishedAt)}</>
          )}
        </div>
        <h3 className="text-base font-semibold leading-snug line-clamp-2 mt-1">
          <Link
            href={article.articleUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E94560] transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-3 flex justify-end">
        <Bookmark
          size={18}
          onClick={onBookmark}
          className={cn(
            "cursor-pointer transition-colors",
            isBookmarked
              ? "fill-[#E94560] stroke-[#E94560]"
              : "stroke-muted-foreground hover:stroke-[#E94560]"
          )}
        />
      </div>
    </div>
  );
}