import { getTranslations } from "next-intl/server";
import { FAQContent } from "@/components/public/faq/faq-content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'FAQ' });
    return { title: `${t('heroTitle')} | SharePay` };
}

export default function FAQPage() {
    return <FAQContent />;
}
