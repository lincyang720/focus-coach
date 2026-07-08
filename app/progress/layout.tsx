import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Training Progress Tracker",
  description:
    "Review Focus Coach session history, attention game scores, training time, and productivity-oriented progress trends.",
  alternates: {
    canonical: "/progress"
  }
};

export default function ProgressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
