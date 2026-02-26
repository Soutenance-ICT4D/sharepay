"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/i18n/routing";
import { toast } from "sonner";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { AppGeneralSection } from "@/components/dashboard/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/dashboard/apps/sections/app-branding-section";
import { AppConfigSection } from "@/components/dashboard/apps/sections/app-config-section";
import { AppKeysSection } from "@/components/dashboard/apps/sections/app-keys-section";
import { ApiKeysRevealModal } from "@/components/dashboard/apps/api-keys-reveal-modal";

import { appsService } from "@/core/services/apps.service";

export default function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const t = useTranslations("Dashboard.Apps.Form");
    const router = useRouter();

    // ── Loading ───────────────────────────────────────────────────────────────
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // ── Form state ────────────────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [themeColor, setThemeColor] = useState("#088a5c");
    const [logoMode, setLogoMode] = useState<"none" | "upload" | "url">("none");
    const [logoUrlInput, setLogoUrlInput] = useState("");
    const [logoDataUrl, setLogoDataUrl] = useState("");
    const [status, setStatus] = useState("SANDBOX");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [fallbackUrl, setFallbackUrl] = useState("");

    // ── Keys (prefix only for display) ───────────────────────────────────────
    const [publicKeyPrefix, setPublicKeyPrefix] = useState("");
    const [secretKeyPrefix, setSecretKeyPrefix] = useState("");

    // ── Keys modal ────────────────────────────────────────────────────────────
    const [showKeysModal, setShowKeysModal] = useState(false);
    const [generatedKeys, setGeneratedKeys] = useState({ public: "", secret: "" });

    // ── Load app + keys on mount ──────────────────────────────────────────────
    useEffect(() => {
        setIsLoading(true);
        setLoadError(null);

        Promise.all([appsService.getById(id), appsService.getKeys(id)])
            .then(([app, keys]) => {
                setName(app.name);
                setDescription(app.description || "");
                setSiteUrl(app.siteUrl || "");
                setStatus(app.environment);
                setThemeColor(app.themeColor || "#088a5c");
                setWebhookUrl(app.webhookUrl || "");
                setFallbackUrl(app.fallbackUrl || "");

                // Restore logo mode
                if (app.logoUrl) {
                    setLogoMode("url");
                    setLogoUrlInput(app.logoUrl);
                } else {
                    setLogoMode("none");
                }

                // Key prefixes (keyPrefix field — no secretKey exposed here)
                const pubKey = keys.find(k => k.keyType === "PUBLIC");
                const secKey = keys.find(k => k.keyType === "SECRET");
                setPublicKeyPrefix(pubKey?.keyPrefix ?? "");
                setSecretKeyPrefix(secKey?.keyPrefix ?? "");
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : "UNKNOWN_ERROR";
                setLoadError(msg);
                toast.error(`Erreur de chargement : ${msg}`);
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    // ── Submit (PUT) ──────────────────────────────────────────────────────────
    const resolvedLogoUrl =
        logoMode === "url" ? logoUrlInput || null
            : logoMode === "upload" ? logoDataUrl || null
                : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await appsService.update(id, {
                name: name.trim(),
                description: description.trim(),
                siteUrl: siteUrl.trim() || undefined,
                logoUrl: resolvedLogoUrl,
                themeColor,
                webhookUrl: webhookUrl.trim() || undefined,
                fallbackUrl: fallbackUrl.trim() || undefined,
            });
            toast.success("Application modifiée avec succès !");
            router.push("/dashboard/apps");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "UNKNOWN_ERROR";
            toast.error(`Erreur : ${msg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Key rotation (POST /apps/{id}/keys) ───────────────────────────────────
    const handleRegenerateKeys = async () => {
        try {
            const newKeys = await appsService.rotateKeys(id);
            // secretKey is visible only now
            const pubFull = newKeys.find(k => k.keyType === "PUBLIC")?.secretKey ?? "";
            const secFull = newKeys.find(k => k.keyType === "SECRET")?.secretKey ?? "";
            setGeneratedKeys({ public: pubFull, secret: secFull });
            // Refresh displayed prefixes
            const pubKey = newKeys.find(k => k.keyType === "PUBLIC");
            const secKey = newKeys.find(k => k.keyType === "SECRET");
            setPublicKeyPrefix(pubKey?.keyPrefix ?? "");
            setSecretKeyPrefix(secKey?.keyPrefix ?? "");
            setShowKeysModal(true);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "UNKNOWN_ERROR";
            toast.error(`Erreur : ${msg}`);
        }
    };

    // ── Render ────────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6 md:p-8 pt-6 flex items-center justify-center min-h-64">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm">Chargement de l&apos;application…</p>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="max-w-4xl mx-auto p-6 md:p-8 pt-6">
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
                    {loadError}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6 md:p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">{t("editTitle")}</h2>
                    <p className="text-muted-foreground">{t("editDescription")}</p>
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
                    status={status} setStatus={setStatus}
                    webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl}
                    fallbackUrl={fallbackUrl} setFallbackUrl={setFallbackUrl}
                    readOnly
                />

                <AppKeysSection
                    publicKeyPrefix={publicKeyPrefix}
                    secretKeyPrefix={secretKeyPrefix}
                    onRegenerateKeys={handleRegenerateKeys}
                />

                <Button
                    type="submit"
                    size="lg"
                    disabled={!name.trim() || isSubmitting}
                    className="w-full h-14 text-lg font-black shadow-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t("submitting") : t("submitEdit")}
                </Button>
            </form>

            {showKeysModal && (
                <ApiKeysRevealModal
                    publicKey={generatedKeys.public}
                    secretKey={generatedKeys.secret}
                    onConfirm={() => setShowKeysModal(false)}
                />
            )}
        </div>
    );
}
