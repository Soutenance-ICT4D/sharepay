import { HeroSection } from "@/components/public/landing/hero-section";
import { PaymentMethodSection } from "@/components/public/landing/payment-method-section";
import { HowItWorksSection } from "@/components/public/landing/how-it-works-section";
import { IntegrationSection } from "@/components/public/landing/integration-section";
import { WhyChooseSection } from "@/components/public/landing/why-choose-section";
import { PricingSection } from "@/components/public/landing/pricing-section";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen">
            <HeroSection />
            <PaymentMethodSection />
            <HowItWorksSection />
            <IntegrationSection />
            <WhyChooseSection />
            <PricingSection />
        </main>
    );
}
