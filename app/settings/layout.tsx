import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Coach Account Settings",
  description:
    "Manage Focus Coach account details, subscription status, and local Pro demo settings.",
  alternates: {
    canonical: "/settings"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
