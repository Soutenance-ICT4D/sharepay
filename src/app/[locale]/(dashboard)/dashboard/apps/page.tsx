import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Dashboard' });

    return {
        title: `${t('Sidebar.apps')} | ${t('title')} - SharePay`,
    };
}

export default function AppsPage() {
    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
            </div>
            <div className="rounded-md border p-8 flex items-center justify-center flex-col min-h-[400px]">
                <h3 className="text-2xl font-bold tracking-tight text-center">Page des applications</h3>
                <p className="text-muted-foreground mt-2">Cette fonctionnalité sera bientôt disponible.</p>
            </div>
        </div>
    );
}
