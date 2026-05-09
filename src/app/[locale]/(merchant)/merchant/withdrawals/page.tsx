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

export default function WithdrawalsPage() {
    return <WithdrawalsClientPage />;
}
