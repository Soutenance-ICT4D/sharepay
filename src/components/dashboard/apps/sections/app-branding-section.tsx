"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface AppBrandingSectionProps {
    themeColor: string;
    setThemeColor: (val: string) => void;
    logoUrl?: string;
    setLogoUrl: (val: string) => void;
}

export function AppBrandingSection({
    themeColor,
    setThemeColor,
    logoUrl,
    setLogoUrl,
}: AppBrandingSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.Branding");

    const PRESET_COLORS = ["#0f172a", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ec4899", "#8b5cf6"];

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold">{t("title")}</h3>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>

            <div className="grid gap-6">
                {/* Theme Color */}
                <div className="space-y-3">
                    <Label>{t("themeColor")}</Label>
                    <div className="flex flex-wrap gap-3">
                        {PRESET_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setThemeColor(color)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${themeColor === color ? "border-primary scale-110 shadow-sm" : "border-transparent hover:scale-110"
                                    }`}
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                        <div className="relative overflow-hidden w-8 h-8 rounded-full border-2 ml-2 transition-all hover:scale-110 focus-within:border-primary focus-within:scale-110">
                            <input
                                type="color"
                                value={themeColor}
                                onChange={(e) => setThemeColor(e.target.value)}
                                className="absolute inset-[-10px] w-[50px] h-[50px] cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <div className="space-y-3">
                    <Label>{t("logo")}</Label>
                    <div className="flex items-center gap-4">
                        {logoUrl ? (
                            <div className="relative h-16 w-16 rounded-xl border flex items-center justify-center bg-muted/30 overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logoUrl} alt="App Logo" className="max-h-full max-w-full object-contain p-1" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                                        onClick={() => setLogoUrl("")}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="h-16 w-16 rounded-xl border-2 border-dashed flex items-center justify-center bg-muted/10">
                                <Upload className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                        )}
                        <div className="flex-1 space-y-2">
                            <Input
                                placeholder="https://..."
                                value={logoUrl || ""}
                                onChange={(e) => setLogoUrl(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                {t("logoUpload")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
