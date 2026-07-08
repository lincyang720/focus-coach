import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Focus Training Account",
  description:
    "Create a Focus Coach account to start short focus training games and track productivity-oriented progress.",
  alternates: {
    canonical: "/register"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
