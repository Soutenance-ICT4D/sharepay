"use client";

import { HeroSection } from "@/components/public/landing/hero-section";
import { ConnectivitySection } from "@/components/public/landing/connectivity-section";
import { IntegrationSection } from "@/components/public/landing/integration-section";
import { SecuritySection } from "@/components/public/landing/security-section";
import { PricingSection } from "@/components/public/landing/pricing-section";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <HeroSection />
            <ConnectivitySection />
            <IntegrationSection />
            <SecuritySection />
            <PricingSection />
        </main>
    );
}
