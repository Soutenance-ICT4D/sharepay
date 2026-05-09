import { getTranslations } from "next-intl/server";
import { WithdrawalsConfigPage } from "@/components/merchant/withdrawals/withdrawals-config-page";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const t = await getTranslations({ locale: params.locale, namespace: "Dashboard.Withdrawals" });
    return {
        title: `${t("ConfigPage.title")} | SharePay`,
        description: t("ConfigPage.subtitle"),
    };
}

export default function WithdrawalsConfigRoutePage() {
    return <WithdrawalsConfigPage />;
}
