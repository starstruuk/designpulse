"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Bookmark, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home",      href: "/",           icon: Home       },
  { label: "Resources", href: "/resources",  icon: LayoutGrid },
  { label: "Bookmarks", href: "/bookmarks",  icon: Bookmark   },
  { label: "Profile",   href: "/profile",    icon: User       },
];

/**
 * Fixed bottom navigation bar for mobile screens.
 * Hidden on lg and above.
 */
export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 h-16 z-50",
      "flex lg:hidden items-center justify-around",
      "bg-white border-t border-[#E5E7EB]",
      "dark:bg-[#0F3460] dark:border-[#1F2B4A]"
    )}>
      {TABS.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
              isActive
                ? "text-[#E94560]"
                : "text-muted-foreground hover:text-[#E94560]"
            )}
          >
            <Icon className="size-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}