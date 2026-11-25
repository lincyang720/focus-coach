import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Daily Focus Training Dashboard";
const description = "Start a daily focus training plan with recommended attention games, adaptive difficulty, and basic productivity stats.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/dashboard"
  },
  ...shareMetadata(title + " | Focus Coach", description, "/dashboard")
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
