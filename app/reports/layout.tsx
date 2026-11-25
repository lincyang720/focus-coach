import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "AI Weekly Focus Training Report";
const description = "Generate a weekly AI productivity recap from Focus Coach training sessions, accuracy, time, and attention game results.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/reports"
  },
  ...shareMetadata(title + " | Focus Coach", description, "/reports")
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
