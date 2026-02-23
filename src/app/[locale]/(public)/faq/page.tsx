import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/public/landing/site-header";
import { SiteFooter } from "@/components/public/landing/site-footer";
import { FAQContent } from "@/components/public/faq/faq-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard' });

    return {
        title: `${t('Sidebar.faq')} | ${t('title')} - SharePay`,
    };
}

export default function FAQPage() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <FAQContent />

            <SiteFooter />
        </div>
    );
}
