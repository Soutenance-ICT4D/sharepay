import { CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PricingSectionProps {
    amountType: "fixed" | "free";
    setAmountType: (value: "fixed" | "free") => void;
    currency: string;
    setCurrency: (value: string) => void;
    amount: string;
    setAmount: (value: string) => void;
}

export function PricingSection({
    amountType,
    setAmountType,
    currency,
    setCurrency,
    amount,
    setAmount,
}: PricingSectionProps) {
    const t = useTranslations('Dashboard.FundsCollection.New');
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <CreditCard className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionPricing")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>{t("typeLabel")}</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={amountType}
                            onChange={(e) => setAmountType(e.target.value as "fixed" | "free")}
                        >
                            <option value="fixed">{t("typeFixed")}</option>
                            <option value="free">{t("typeFree")}</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("currencyLabel")}</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option value="FCFA">FCFA</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                </div>

                {amountType === "fixed" && (
                    <div className="mt-4 space-y-2">
                        <Label>{t("priceLabel")}</Label>
                        <Input
                            type="number"
                            placeholder={t("pricePlaceholder")}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="text-lg font-bold bg-background focus:ring-primary"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
