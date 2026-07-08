import { Header } from "@/components/layout/header";
import Link from "next/link";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t bg-background/88">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Focus Coach is a productivity tool for short focus training sessions.</p>
          <nav className="flex gap-4">
            <Link className="hover:text-foreground" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:text-foreground" href="/terms">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
