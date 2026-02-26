"use client";

import { useRef } from "react";
import { Palette, Upload, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BrandingSectionProps {
    logoMode: "none" | "upload" | "url";
    setLogoMode: (value: "none" | "upload" | "url") => void;
    logoUrlInput: string;
    setLogoUrlInput: (value: string) => void;
    logoDataUrl: string;
    setLogoDataUrl: (value: string) => void;
    themeColor: string;
    setThemeColor: (value: string) => void;
}

export function BrandingSection({
    logoMode,
    setLogoMode,
    logoUrlInput,
    setLogoUrlInput,
    logoDataUrl,
    setLogoDataUrl,
    themeColor,
    setThemeColor,
}: BrandingSectionProps) {
    const t = useTranslations("Dashboard.PaymentLinks.New");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const PRESET_COLORS = ["#088a5c", "#0f172a", "#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ec4899"];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setLogoDataUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleClearLogo = () => {
        setLogoDataUrl("");
        setLogoUrlInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const logoPreview = logoMode === "url" ? logoUrlInput : logoMode === "upload" ? logoDataUrl : undefined;

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Palette className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionBranding")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">

                {/* ── Logo ─────────────────────────────────────── */}
                <div className="space-y-4">
                    <Label>{t("logoLabel")}</Label>

                    {/* Mode selector */}
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={logoMode}
                        onChange={(e) => {
                            setLogoMode(e.target.value as "none" | "upload" | "url");
                            handleClearLogo();
                        }}
                    >
                        <option value="none">{t("logoNone")}</option>
                        <option value="url">{t("logoUrl")}</option>
                        <option value="upload">{t("logoUpload")}</option>
                    </select>

                    {/* URL mode */}
                    {logoMode === "url" && (
                        <Input
                            placeholder="https://example.com/logo.png"
                            value={logoUrlInput}
                            onChange={(e) => setLogoUrlInput(e.target.value)}
                            className="bg-background"
                        />
                    )}

                    {/* Upload mode */}
                    {logoMode === "upload" && (
                        <div className="space-y-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full gap-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="w-4 h-4" />
                                {logoDataUrl ? t("logoChangeFile") : t("logoSelectFile")}
                            </Button>
                            <p className="text-xs text-muted-foreground">{t("logoFileTypes")}</p>
                        </div>
                    )}

                    {/* Preview for url / upload */}
                    {logoPreview && (
                        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-xl border border-border bg-background overflow-hidden group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-full h-full object-contain p-1"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                            <button
                                type="button"
                                onClick={handleClearLogo}
                                className="absolute top-1 right-1 hidden group-hover:flex items-center justify-center w-5 h-5 bg-destructive/90 rounded-full text-white"
                                title={t("logoRemove")}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    )}

                    {/* Default — SharePay logo */}
                    {logoMode === "none" && (
                        <div className="flex flex-col items-start gap-2">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl border border-border bg-background overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/logo_sharepay_bg_remove_svg.svg"
                                    alt="SharePay logo"
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">{t("logoDefaultCaption")}</p>
                        </div>
                    )}
                </div>

                {/* ── Theme Color ──────────────────────────────── */}
                <div className="space-y-4">
                    <Label>{t("colorLabel")}</Label>

                    {/* Preset swatches */}
                    <div className="flex flex-wrap gap-2">
                        {PRESET_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                title={color}
                                onClick={() => setThemeColor(color)}
                                className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                                style={{
                                    backgroundColor: color,
                                    borderColor: themeColor === color ? "white" : "transparent",
                                    outline: themeColor === color ? `2px solid ${color}` : "none",
                                    outlineOffset: "2px",
                                }}
                            />
                        ))}
                    </div>

                    {/* Custom color picker + hex input */}
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                            className="h-10 w-12 rounded cursor-pointer border border-border p-0.5 bg-background"
                        />
                        <Input
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                            className="font-mono uppercase bg-background"
                            maxLength={7}
                            placeholder="#088a5c"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
