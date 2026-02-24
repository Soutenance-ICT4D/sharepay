import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BrandingSectionProps {
    logoMode: "none" | "upload" | "url";
    setLogoMode: (value: "none" | "upload" | "url") => void;
    logoUrlInput: string;
    setLogoUrlInput: (value: string) => void;
    setLogoDataUrl: (value: string) => void;
    themeColor: string;
    setThemeColor: (value: string) => void;
}

export function BrandingSection({
    logoMode,
    setLogoMode,
    logoUrlInput,
    setLogoUrlInput,
    setLogoDataUrl,
    themeColor,
    setThemeColor,
}: BrandingSectionProps) {
    const t = useTranslations('Dashboard.PaymentLinks.New');
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Palette className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionBranding")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="space-y-4">
                    <Label>{t("logoLabel")}</Label>
                    <div className="flex flex-col gap-2">
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={logoMode}
                            onChange={(e) => setLogoMode(e.target.value as "none" | "upload" | "url")}
                        >
                            <option value="none">{t("logoNone")}</option>
                            <option value="url">{t("logoUrl")}</option>
                            <option value="upload">{t("logoUpload")}</option>
                        </select>
                        {logoMode === 'url' && (
                            <Input placeholder="https://..." value={logoUrlInput} onChange={(e) => setLogoUrlInput(e.target.value)} className="bg-background focus:ring-primary" />
                        )}
                        {logoMode === 'upload' && (
                            <Input
                                type="file"
                                accept="image/*"
                                className="bg-background focus:ring-primary file:text-foreground file:bg-muted file:border-0 hover:file:bg-muted/80"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => setLogoDataUrl(reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label>{t("colorLabel")}</Label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                            className="h-10 w-12 rounded cursor-pointer border-none p-0"
                        />
                        <Input value={themeColor} onChange={(e) => setThemeColor(e.target.value)} className="font-mono uppercase bg-background focus:ring-primary" />
                    </div>
                </div>
            </div>
        </section>
    );
}
