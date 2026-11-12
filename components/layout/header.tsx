"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Brain, CreditCard, LineChart, LogIn, LogOut, Settings, Target, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearCurrentUser, getCurrentUser } from "@/lib/storage";
import type { UserProfile } from "@/lib/types";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Target },
  { href: "/deep-work-timer", label: "Deep Work", icon: Timer },
  { href: "/games", label: "Games", icon: Brain },
  { href: "/memory-games", label: "Memory Games", icon: Brain },
  { href: "/blog", label: "Guides", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/reports", label: "Reports", icon: Brain },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  function signOut() {
    clearCurrentUser();
    setUser(null);
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" aria-hidden />
          </span>
          <span>Focus Coach</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden flex-1 flex-wrap items-center justify-center gap-1 px-2 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>
                <item.icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        {user ? (
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">
              <LogIn className="h-4 w-4" aria-hidden />
              Sign in
            </Link>
          </Button>
        )}
      </div>
      <nav aria-label="Main navigation" className="border-t px-4 py-2 md:hidden">
          <Link className="text-sm font-medium text-primary underline underline-offset-4" href="/memory-games">
            Memory Games
          </Link>
        </nav>
    </header>
  );
}
