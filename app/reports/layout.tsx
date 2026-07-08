import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Weekly Focus Training Report",
  description:
    "Generate a weekly AI productivity recap from Focus Coach training sessions, accuracy, time, and attention game results.",
  alternates: {
    canonical: "/reports"
  }
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
