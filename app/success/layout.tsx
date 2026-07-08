import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Focus Coach Subscription Success",
  description:
    "Focus Coach subscription confirmation for unlimited focus training and weekly AI productivity recaps.",
  alternates: {
    canonical: "/success"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
