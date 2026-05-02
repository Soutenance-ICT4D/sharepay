import { Link2Off } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProductDetailsSectionProps {
    appId: string;
    setAppId: (value: string) => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
}

export function ProductDetailsSection({
    appId,
    setAppId,
    title,
    setTitle,
    description,
    setDescription,
}: ProductDetailsSectionProps) {
    const t = useTranslations('Dashboard.FundsCollection.New');
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Link2Off className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionProduct")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>{t("appLabel")}</Label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary"
                            value={appId}
                            onChange={(e) => setAppId(e.target.value)}
                        >
                            <option value="">{t("appNone")}</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="title">{t("nameLabel")}</Label>
                    <Input
                        id="title"
                        placeholder={t("namePlaceholder")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-background focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="desc">{t("descLabel")}</Label>
                    <textarea
                        id="desc"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("descPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}
