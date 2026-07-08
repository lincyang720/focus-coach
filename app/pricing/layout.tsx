import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable Focus Training App Pricing",
  description:
    "Compare the free Focus Coach plan with the $29.99/year Pro plan for unlimited focus training and weekly AI recaps.",
  alternates: {
    canonical: "/pricing"
  }
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
