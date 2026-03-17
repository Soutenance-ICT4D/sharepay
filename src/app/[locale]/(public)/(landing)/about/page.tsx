import { AboutHero } from "@/components/public/landing/about/about-hero";
import { AboutStats } from "@/components/public/landing/about/about-stats";
import { AboutSections } from "@/components/public/landing/about/about-sections";
import { FeaturesCTA } from "@/components/public/landing/features/feature-detail-sections";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <AboutHero />
            <AboutStats />
            <AboutSections />
            <FeaturesCTA />
        </div>
    );
}
