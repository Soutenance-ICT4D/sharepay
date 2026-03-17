import { PricingHero } from "@/components/public/landing/pricing/pricing-hero";
import { PricingPlans } from "@/components/public/landing/pricing/pricing-plans";
import { PricingFAQ } from "@/components/public/landing/pricing/pricing-faq";
import { PricingSection } from "@/components/public/landing/pricing-section"; // Calculator
import { FeaturesCTA } from "@/components/public/landing/features/feature-detail-sections";

export default function PricingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PricingHero />
            <PricingPlans />
            {/* Reuse the interactive calculator for more engagement */}
            <div className="py-20 bg-background text-center">
                <div className="container mx-auto px-6 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Estimez vos frais</h2>
                    <p className="text-muted-foreground mt-4">Utilisez notre simulateur pour voir combien vous économisez avec SharePay.</p>
                </div>
                <PricingSection />
            </div>
            <PricingFAQ />
            <FeaturesCTA />
        </div>
    );
}
