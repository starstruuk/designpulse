'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResourceCard from '@/components/resource/ResourceCard';
import CategoryGrid from '@/components/resource/CategoryGrid';
import RecentlyAdded from '@/components/resource/RecentlyAdded';
import Pagination from '@/components/shared/Pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const PRICING_OPTIONS = [
  { label: 'Free',     value: 'FREE',     color: '#22C55E', bg: 'rgba(34,197,94,0.12)'  },
  { label: 'Freemium', value: 'FREEMIUM', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  { label: 'Paid',     value: 'PAID',     color: '#3B82F6', bg: 'rgba(59,130,246,0.12)' },
];

/**
 * Resource directory page — filterable by category, pricing, and search.
 */
export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePricing, setActivePricing]   = useState('');
  const [search, setSearch]                 = useState('');
  const [resources, setResources]           = useState<any[]>([]);
  const [categories, setCategories]         = useState<any[]>([]);
  const [loading, setLoading]               = useState(true);
  const [page, setPage]                     = useState(1);
  const [totalPages, setTotalPages]         = useState(1);
  const [total, setTotal]                   = useState(0);

  // Fetch categories once on mount
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch resources whenever filters or page change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (activePricing)            params.set('pricing',  activePricing);
    if (search)                   params.set('search',   search);
    params.set('page',  String(page));
    params.set('limit', '40');

    fetch(`/api/resources?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
      })
      .catch((err) => console.error('Error fetching resources:', err))
      .finally(() => setLoading(false));
  }, [activeCategory, activePricing, search, page]);

  function handleCategorySelect(slug: string) {
    setActiveCategory(slug);
    setPage(1);
  }

  function handlePricingToggle(pricing: string) {
    setActivePricing((prev) => (prev === pricing ? '' : pricing));
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function resetFilters() {
    setActiveCategory('all');
    setActivePricing('');
    setSearch('');
    setPage(1);
  }

  const recentResources = [...resources]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <main className="flex-1 xl:mr-[280px] p-6">

          {/* Page header */}
          <h1 className="text-2xl font-bold text-foreground">Resource Directory</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            {total} tools & resources • Updated daily
          </p>

          {/* Search bar */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search tools, resources, categories…"
              className="pl-10 h-12 rounded-xl w-full"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Category grid */}
          <CategoryGrid
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />

          {/* Pricing filter row */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">Pricing:</span>
            {PRICING_OPTIONS.map((option) => {
              const isActive = activePricing === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handlePricingToggle(option.value)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                  style={
                    isActive
                      ? {
                          backgroundColor: option.bg,
                          color:           option.color,
                          borderColor:     option.color + '40',
                        }
                      : undefined
                  }
                  // inactive classes applied via className only when not active
                  data-inactive={!isActive}
                >
                  <span className={!isActive ? 'text-muted-foreground' : ''}>
                    {option.label}
                  </span>
                </button>
              );
            })}
            {activePricing && (
              <button
                className="text-xs text-[#E94560] ml-1"
                onClick={() => setActivePricing('')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Resource grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="rounded-xl h-48" />
              ))}
            </div>
          ) : resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No resources match your filters</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-[#E94560] text-white text-sm hover:bg-[#E94560]/90 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>

        {/* Right rail */}
        <aside className="hidden xl:flex flex-col gap-6 fixed right-0 top-16 w-[280px] h-[calc(100vh-4rem)] overflow-y-auto border-l border-border bg-card p-4 z-30">
          <RecentlyAdded resources={recentResources} />

          <div className="rounded-xl border border-dashed border-[#E94560]/40 p-4 flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Know a great tool?</p>
            <p className="text-xs text-muted-foreground">
              Help the community by submitting a resource
            </p>
            <button className="w-full mt-1 py-2 rounded-lg border border-[#E94560] text-[#E94560] text-sm font-medium hover:bg-[#E94560] hover:text-white transition-colors">
              Submit a Resource
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}