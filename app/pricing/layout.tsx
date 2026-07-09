import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable AI Brain Training App Pricing",
  description:
    "Compare the free Focus Coach plan with the $29.99/year Pro plan for personalized cognitive training, unlimited brain training, and weekly AI recaps.",
  keywords: [
    "AI brain training",
    "personalized cognitive training",
    "brain training app",
    "cognitive training app",
    "focus training app pricing"
  ],
  alternates: {
    canonical: "/pricing"
  }
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
