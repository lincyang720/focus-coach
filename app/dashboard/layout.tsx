import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Focus Training Dashboard",
  description:
    "Start a daily focus training plan with recommended attention games, adaptive difficulty, and basic productivity stats.",
  alternates: {
    canonical: "/dashboard"
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
