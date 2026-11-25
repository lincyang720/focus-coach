import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Focus Coach Account Settings";
const description = "Manage Focus Coach account details, subscription status, and local Pro demo settings.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/settings"
  },
  robots: {
    index: false,
    follow: true
  },
  ...shareMetadata(title + " | Focus Coach", description, "/settings")
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
