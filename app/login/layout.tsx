import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Focus Coach Login";
const description = "Sign in to Focus Coach to continue focus training games, productivity tracking, and AI weekly recaps.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/login"
  },
  robots: {
    index: false,
    follow: true
  },
  ...shareMetadata(title + " | Focus Coach", description, "/login")
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
