import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Coach Login",
  description:
    "Sign in to Focus Coach to continue focus training games, productivity tracking, and AI weekly recaps.",
  alternates: {
    canonical: "/login"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
