"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing until mounted on client
  if (!mounted) return <button className="p-2 rounded-md w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-accent/10"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark
        ? <SunIcon className="size-5" />
        : <MoonIcon className="size-5" />
      }
    </button>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 h-16 w-full z-50 bg-white dark:bg-[#0F3460] border-b border-[#E5E7EB] dark:border-none">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        {/* left: logo */}
        <Link href="/" className="font-bold text-[#E94560] text-lg">
          DesignPulse
        </Link>

        {/* center: search input */}
        <div className="flex-1 flex justify-center">
          <Input
            placeholder="Search articles and tools..."
            className="max-w-md w-full"
          />
        </div>

        {/* right: theme toggle + sign in */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline">Sign In</Button>
        </div>
      </div>
    </nav>
  );
}