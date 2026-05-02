import { getTranslations } from "next-intl/server";
import { WithdrawalsClientPage } from "@/components/merchant/withdrawals/withdrawals-client-page";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const t = await getTranslations({ locale: params.locale, namespace: 'Dashboard.Withdrawals' });

    return {
        title: `${t('title')} | SharePay`,
        description: t('subtitle'),
    };
}

export default async function WithdrawalsPage() {
    // Calling getTranslations without locale uses the implicit one
    const t = await getTranslations('Dashboard.Withdrawals');

    return (
        <WithdrawalsClientPage
            title={t('title')}
            subtitle={t('subtitle')}
        />
    );
}
