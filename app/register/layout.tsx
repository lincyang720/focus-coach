import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Create a Focus Training Account";
const description = "Create a Focus Coach account to start short focus training games and track productivity-oriented progress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/register"
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: shareMetadata(title + " | Focus Coach", description, "/register")
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
