import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Focus Coach Subscription Success";
const description = "Focus Coach subscription confirmation for unlimited focus training and weekly AI productivity recaps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/success"
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: shareMetadata(title + " | Focus Coach", description, "/success")
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
