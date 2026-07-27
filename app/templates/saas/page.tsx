import { FaqSection } from "@/app/templates/saas/_components/faq-section"
import { FeatureGrid } from "@/app/templates/saas/_components/feature-grid"
import { HeroSection } from "@/app/templates/saas/_components/hero-section"
import { PricingSection } from "@/app/templates/saas/_components/pricing-section"

export default function SaasLandingPage() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <HeroSection />
      <FeatureGrid />
      <PricingSection />
      <FaqSection />
    </div>
  )
}
