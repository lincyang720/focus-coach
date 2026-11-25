import { shareMetadata } from "@/lib/share-metadata";
import type { Metadata } from "next";

const title = "Affordable AI Brain Training App Pricing";
const description = "Compare the free Focus Coach plan with the $29.99/year Pro plan for personalized cognitive training, unlimited brain training, and weekly AI recaps.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI brain training",
    "personalized cognitive training",
    "brain training app",
    "cognitive training app",
    "focus training app pricing"
  ],
  alternates: {
    canonical: "/pricing"
  },
  ...shareMetadata(title + " | Focus Coach", description, "/pricing")
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
