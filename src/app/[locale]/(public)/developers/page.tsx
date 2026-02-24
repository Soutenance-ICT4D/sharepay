import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/public/landing/site-header";
import { SiteFooter } from "@/components/public/landing/site-footer";
import { DevelopersContent } from "@/components/public/developers/developers-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard' });

    return {
        title: `${t('Sidebar.developers')} | SharePay`,
    };
}

export default async function DevelopersPage() {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />

            <div className="pt-24 lg:pt-32">
                <DevelopersContent />
            </div>

            <SiteFooter />
        </div>
    );
}
