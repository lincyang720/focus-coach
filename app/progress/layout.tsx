import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Focus Training Progress Tracker";
const description = "Review Focus Coach session history, attention game scores, training time, and productivity-oriented progress trends.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/progress"
  },
  ...shareMetadata(title + " | Focus Coach", description, "/progress")
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
