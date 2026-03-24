"use client";

import * as React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar, { SidebarFilters } from "@/components/layout/Sidebar";
import ArticleCard from "@/components/article/ArticleCard";
import RightRail from "@/components/layout/RightRail";
import Pagination from "@/components/shared/Pagination";
import { Article } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [filters, setFilters] = React.useState<SidebarFilters>({
    disciplines: [],
    sortBy: "newest",
    fromDate: "",
    toDate: "",
    tags: [],
  });
  const [articles, setArticles]     = React.useState<Article[]>([]);
  const [loading, setLoading]       = React.useState<boolean>(true);
  const [page, setPage]             = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal]           = React.useState(0);

  React.useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.disciplines.length > 0) {
          params.set("disciplines", filters.disciplines.join(","));
        }
        if (filters.fromDate) params.set("from", filters.fromDate);
        if (filters.toDate)   params.set("to",   filters.toDate);
        if (filters.sortBy)   params.set("sortBy", filters.sortBy);
        params.set("page",  String(page));
        params.set("limit", "20");

        const res  = await fetch(`/api/articles?${params.toString()}`);
        const data = await res.json();

        setArticles(data.articles ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters, page]);

  // Reset to page 1 when filters change
  function handleFiltersChange(newFilters: SidebarFilters) {
    setPage(1);
    setFilters(newFilters);
  }

  // Scroll to top when page changes
  function handlePageChange(newPage: number) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar filters={filters} onChange={handleFiltersChange} />

        <main className="flex-1 lg:ml-60 xl:mr-[280px] p-6">
          {/* Page heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Latest in Design
            </h1>
            {!loading && (
              <p className="text-sm text-muted-foreground mt-1">
                {total} articles • Curated daily
              </p>
            )}
          </div>

          {/* Article grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="rounded-xl h-64" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
              <p className="text-lg font-medium">No articles found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isBookmarked={false}
                  onBookmark={() => {}}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>

        <RightRail />
      </div>
    </div>
  );
}