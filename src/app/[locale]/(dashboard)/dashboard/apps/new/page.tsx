"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/i18n/routing";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AppGeneralSection } from "@/components/dashboard/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/dashboard/apps/sections/app-branding-section";
import { AppConfigSection } from "@/components/dashboard/apps/sections/app-config-section";
import { ApiKeysRevealModal } from "@/components/dashboard/apps/api-keys-reveal-modal";

import { appsService } from "@/core/services/apps.service";
import type { AppEnvironment } from "@/core/types/apps.types";

export default function NewAppPage() {
    const t = useTranslations("Dashboard.Apps.Form");
    const router = useRouter();

    // ── General ───────────────────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [siteUrl, setSiteUrl] = useState("");

    // ── Branding ──────────────────────────────────────────────────────────────
    const [themeColor, setThemeColor] = useState("#088a5c");
    const [logoMode, setLogoMode] = useState<"none" | "upload" | "url">("none");
    const [logoUrlInput, setLogoUrlInput] = useState("");
    const [logoDataUrl, setLogoDataUrl] = useState("");

    // ── Config ────────────────────────────────────────────────────────────────
    const [status, setStatus] = useState<AppEnvironment>("SANDBOX");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [fallbackUrl, setFallbackUrl] = useState("");

    // ── Submission state ──────────────────────────────────────────────────────
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showKeysModal, setShowKeysModal] = useState(false);
    const [generatedKeys, setGeneratedKeys] = useState({ public: "", secret: "" });

    const canSubmit = useMemo(
        () => name.trim().length >= 2 && description.trim().length >= 2,
        [name, description]
    );

    const resolvedLogoUrl =
        logoMode === "url" ? logoUrlInput || null
            : logoMode === "upload" ? logoDataUrl || null
                : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const app = await appsService.create({
                name: name.trim(),
                description: description.trim(),
                environment: status,
                siteUrl: siteUrl.trim() || undefined,
                logoUrl: resolvedLogoUrl,
                themeColor,
                webhookUrl: webhookUrl.trim() || undefined,
                fallbackUrl: fallbackUrl.trim() || undefined,
            });

            // Extract full keys from apiKeys[] — only visible at creation
            const publicKey = app.apiKeys?.find(k => k.keyType === "PUBLIC")?.secretKey ?? "";
            const secretKey = app.apiKeys?.find(k => k.keyType === "SECRET")?.secretKey ?? "";

            setGeneratedKeys({ public: publicKey, secret: secretKey });
            setShowKeysModal(true);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "UNKNOWN_ERROR";
            toast.error(`Erreur : ${msg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6 md:p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">{t("createTitle")}</h2>
                    <p className="text-muted-foreground">{t("createDescription")}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                <AppGeneralSection
                    name={name} setName={setName}
                    description={description} setDescription={setDescription}
                    siteUrl={siteUrl} setSiteUrl={setSiteUrl}
                />

                <AppBrandingSection
                    themeColor={themeColor} setThemeColor={setThemeColor}
                    logoMode={logoMode} setLogoMode={setLogoMode}
                    logoUrlInput={logoUrlInput} setLogoUrlInput={setLogoUrlInput}
                    setLogoDataUrl={setLogoDataUrl}
                    logoDataUrl={logoDataUrl}
                />

                <AppConfigSection
                    status={status} setStatus={(v) => setStatus(v as AppEnvironment)}
                    webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl}
                    fallbackUrl={fallbackUrl} setFallbackUrl={setFallbackUrl}
                />

                <Button
                    type="submit"
                    size="lg"
                    disabled={!canSubmit || isSubmitting}
                    className="w-full h-14 text-lg font-black shadow-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t("submitting") : t("submitCreate")}
                </Button>
            </form>

            {showKeysModal && (
                <ApiKeysRevealModal
                    publicKey={generatedKeys.public}
                    secretKey={generatedKeys.secret}
                    onConfirm={() => {
                        setShowKeysModal(false);
                        router.push("/dashboard/apps");
                    }}
                />
            )}
        </div>
    );
}
