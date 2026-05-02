"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface BrandingSectionProps {
    coverImageUrl: string;
    setCoverImageUrl: (value: string) => void;
}

export function BrandingSection({
    coverImageUrl,
    setCoverImageUrl,
}: BrandingSectionProps) {
    const t = useTranslations("Dashboard.FundsCollection.New");
    const [touched, setTouched] = useState(false);

    const urlError =
        touched && coverImageUrl.trim() !== "" && !coverImageUrl.trim().startsWith("https://");

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Palette className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionBranding")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-3">
                <div className="flex items-center gap-1.5">
                    <Label>{t("logoLabel")}</Label>
                    <InfoTooltip text={t("logoUrlTooltip")} />
                </div>
                <Input
                    placeholder="https://example.com/cover.png"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    onBlur={() => setTouched(true)}
                    className={urlError ? "border-destructive" : ""}
                />
                {urlError && (
                    <p className="text-xs text-destructive">{t("logoUrlInvalid")}</p>
                )}

                <div className="relative w-full h-36 rounded-xl border border-border bg-muted/40 overflow-hidden">
                    {coverImageUrl && !urlError ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={coverImageUrl}
                            alt="Cover preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                            }}
                        />
                    ) : null}
                    {/* Placeholder visible quand pas d'URL ou URL invalide */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 ${coverImageUrl && !urlError ? "hidden" : ""}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            className="text-muted-foreground/40">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <p className="text-xs text-muted-foreground">{t("logoUrlCaption")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
