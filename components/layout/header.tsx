import Link from "next/link";
import { BookOpen, Brain, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/deep-work-timer", label: "Deep Work", icon: Timer },
  { href: "/games", label: "Games", icon: Brain },
  { href: "/memory-games", label: "Memory Games", icon: Brain },
  { href: "/blog", label: "Guides", icon: BookOpen },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" aria-hidden />
          </span>
          <span>Focus Coach</span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-1 flex-wrap items-center justify-center gap-1 px-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>
                <item.icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

      </div>

    </header>
  );
}
