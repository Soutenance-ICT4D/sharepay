import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdvancedOptionsSectionProps {
    redirectUrl: string;
    setRedirectUrl: (value: string) => void;
    expiresAt: string;
    setExpiresAt: (value: string) => void;
    collectCustomerInfo: boolean;
    setCollectCustomerInfo: (value: boolean) => void;
}

export function AdvancedOptionsSection({
    redirectUrl,
    setRedirectUrl,
    expiresAt,
    setExpiresAt,
    collectCustomerInfo,
    setCollectCustomerInfo,
}: AdvancedOptionsSectionProps) {
    const t = useTranslations('Dashboard.PaymentLinks.New');
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Settings2 className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionOptions")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>{t("redirectLabel")}</Label>
                        <Input
                            placeholder={t("redirectPlaceholder")}
                            value={redirectUrl}
                            onChange={(e) => setRedirectUrl(e.target.value)}
                            className="bg-background focus:ring-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("expiresLabel")}</Label>
                        <Input
                            type="datetime-local"
                            value={expiresAt}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            className="bg-background focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2 mt-6 p-4 bg-muted/50 rounded-xl border border-border/50">
                    <input
                        type="checkbox"
                        id="collect"
                        checked={collectCustomerInfo}
                        onChange={(e) => setCollectCustomerInfo(e.target.checked)}
                        className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <Label htmlFor="collect" className="cursor-pointer font-medium text-sm">{t("collectLabel")}</Label>
                </div>
            </div>
        </section>
    );
}
