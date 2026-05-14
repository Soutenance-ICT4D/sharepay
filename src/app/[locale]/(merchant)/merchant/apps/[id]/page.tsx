"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeading } from "@/components/merchant/page-heading";
import { AppGeneralSection } from "@/components/merchant/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/merchant/apps/sections/app-branding-section";
import { AppConfigSection } from "@/components/merchant/apps/sections/app-config-section";
import { AppKeysSection } from "@/components/merchant/apps/sections/app-keys-section";
import { AppWebhooksSection } from "@/components/merchant/apps/sections/app-webhooks-section";
import { ApiKeysRevealModal } from "@/components/merchant/apps/api-keys-reveal-modal";
import { KeyActionModal } from "@/components/merchant/apps/key-action-modal";
import { DeleteAppModal } from "@/components/merchant/apps/delete-app-modal";

import { appsService, apiKeysService, type AppKeyEnvironment } from "@/features/merchant/apps";
import { resolveError } from "@/lib/api/response-codes";
import { useBreadcrumb } from "@/providers/breadcrumb-provider";

interface SavedValues {
    name: string;
    description: string;
    websiteUrl: string;
    themeColor: string;
    logoUrl: string | null;
    webhookUrl: string;
    successUrl: string;
    cancelUrl: string;
}

function isValidUrl(url: string): boolean {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

const urlOk = (u: string) => !u.trim() || isValidUrl(u.trim());

export default function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const t = useTranslations("Dashboard.Apps.Form");
    const tGlobal = useTranslations();
    const router = useRouter();
    const { setLabel, clearLabel } = useBreadcrumb();

    // ── Loading ────────────────────────────────────────────────────────────────
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isKeyLoading, setIsKeyLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    // ── Form state ─────────────────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [currency, setCurrency] = useState("");
    const [themeColor, setThemeColor] = useState("#088a5c");
    const [logoUrlInput, setLogoUrlInput] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [successUrl, setSuccessUrl] = useState("");
    const [cancelUrl, setCancelUrl] = useState("");

    // ── Saved state (dirty detection) ─────────────────────────────────────────
    const [savedValues, setSavedValues] = useState<SavedValues | null>(null);

    // ── Key state ──────────────────────────────────────────────────────────────
    const [keyPrefix, setKeyPrefix] = useState<string | null>(null);
    const [keyName, setKeyName] = useState<string | null>(null);
    const [keyEnvironment, setKeyEnvironment] = useState<AppKeyEnvironment | null>(null);

    // ── Modals ─────────────────────────────────────────────────────────────────
    const [showKeyActionModal, setShowKeyActionModal] = useState(false);
    const [keyActionMode, setKeyActionMode] = useState<"create" | "rotate">("create");
    const [showKeysModal, setShowKeysModal] = useState(false);
    const [revealedKey, setRevealedKey] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [appName, setAppName] = useState("");

    // ── Load app ───────────────────────────────────────────────────────────────
    useEffect(() => {
        setIsLoading(true);
        setLoadError(null);

        appsService.getById(id)
            .then((app) => {
                const logoUrl = app.logoUrl ?? null;

                setName(app.name);
                setAppName(app.name);
                setLabel(id, app.name);
                setDescription(app.description || "");
                setWebsiteUrl(app.websiteUrl || "");
                setCurrency(app.currency || "");
                setThemeColor(app.themeColor || "#088a5c");
                setWebhookUrl(app.webhookUrl || "");
                setSuccessUrl(app.successUrl || "");
                setCancelUrl(app.cancelUrl || "");

                setLogoUrlInput(logoUrl ?? "");

                setKeyPrefix(app.activeKeyPrefix);
                setKeyEnvironment(app.activeKeyEnvironment);

                setSavedValues({
                    name: app.name,
                    description: app.description || "",
                    websiteUrl: app.websiteUrl || "",
                    themeColor: app.themeColor || "#088a5c",
                    logoUrl,
                    webhookUrl: app.webhookUrl || "",
                    successUrl: app.successUrl || "",
                    cancelUrl: app.cancelUrl || "",
                });
            })
            .catch((err: unknown) => {
                const { messageKey, values } = resolveError(err);
                const msg = tGlobal(messageKey, values);
                setLoadError(msg);
                toast.error(msg);
            })
            .finally(() => setIsLoading(false));

        return () => clearLabel(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Computed logo URL ──────────────────────────────────────────────────────
    const resolvedLogoUrl = logoUrlInput.trim() || null;

    // ── Dirty detection ────────────────────────────────────────────────────────
    const isDirty = useMemo(() => {
        if (!savedValues) return false;
        return (
            name.trim() !== savedValues.name ||
            description.trim() !== savedValues.description ||
            websiteUrl.trim() !== savedValues.websiteUrl ||
            themeColor !== savedValues.themeColor ||
            resolvedLogoUrl !== savedValues.logoUrl ||
            webhookUrl.trim() !== savedValues.webhookUrl ||
            successUrl.trim() !== savedValues.successUrl ||
            cancelUrl.trim() !== savedValues.cancelUrl
        );
    }, [name, description, websiteUrl, themeColor, logoUrlInput, webhookUrl, successUrl, cancelUrl, savedValues]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Form validity ──────────────────────────────────────────────────────────
    const isFormValid = useMemo(() =>
        name.trim().length >= 2 &&
        urlOk(websiteUrl) &&
        urlOk(logoUrlInput) &&
        urlOk(webhookUrl) &&
        urlOk(successUrl) &&
        urlOk(cancelUrl),
        [name, websiteUrl, logoUrlInput, webhookUrl, successUrl, cancelUrl]
    );

    const canSave = isDirty && isFormValid && !isSubmitting;

    // ── Submit ─────────────────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSave) return;

        setIsSubmitting(true);
        try {
            await appsService.update(id, {
                name: name.trim(),
                description: description.trim(),
                websiteUrl: websiteUrl.trim() || undefined,
                logoUrl: resolvedLogoUrl,
                themeColor,
                webhookUrl: webhookUrl.trim() || undefined,
                successUrl: successUrl.trim() || undefined,
                cancelUrl: cancelUrl.trim() || undefined,
            });
            toast.success(t("updateSuccess"));

            const newName = name.trim();
            setLabel(id, newName);
            setSavedValues({
                name: newName,
                description: description.trim(),
                websiteUrl: websiteUrl.trim(),
                themeColor,
                logoUrl: resolvedLogoUrl,
                webhookUrl: webhookUrl.trim(),
                successUrl: successUrl.trim(),
                cancelUrl: cancelUrl.trim(),
            });
            setAppName(newName);
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Key generation / rotation ──────────────────────────────────────────────
    const handleRequestGenerate = () => {
        setKeyActionMode("create");
        setShowKeyActionModal(true);
    };

    const handleRequestRotate = () => {
        setKeyActionMode("rotate");
        setShowKeyActionModal(true);
    };

    const handleRevokeKey = async () => {
        setIsKeyLoading(true);
        try {
            await apiKeysService.revoke(id);
            setKeyPrefix(null);
            setKeyName(null);
            setKeyEnvironment(null);
            toast.success(tGlobal("Dashboard.Apps.Form.APIKeys.revokeSuccess"));
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsKeyLoading(false);
        }
    };

    const handleKeyAction = async (name: string, environment: AppKeyEnvironment) => {
        setIsKeyLoading(true);
        try {
            const newKey = keyActionMode === "create"
                ? await apiKeysService.create(id, { name, environment })
                : await apiKeysService.rotate(id, { name, environment });
            setKeyPrefix(newKey.keyPrefix);
            setKeyName(newKey.name);
            setKeyEnvironment(newKey.environment);
            setRevealedKey(newKey.plainTextKey ?? "");
            setShowKeyActionModal(false);
            setShowKeysModal(true);
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsKeyLoading(false);
        }
    };

    // ── Loading skeleton ───────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-96 max-w-full" />
                </div>
                <Skeleton className="h-52 w-full rounded-xl" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="h-80 w-full rounded-xl" />
                    <Skeleton className="h-80 w-full rounded-xl" />
                </div>
                <Skeleton className="h-36 w-full rounded-xl" />
                <Skeleton className="h-14 w-full rounded-xl" />
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="max-w-5xl mx-auto">
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
                    {loadError}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeading
                title={t("editTitle")}
                subtitle={t("editDescription")}
            />

            {/* Clé API */}
            <AppKeysSection
                keyPrefix={keyPrefix}
                keyName={keyName}
                keyEnvironment={keyEnvironment}
                isLoading={isKeyLoading}
                onGenerateKey={handleRequestGenerate}
                onRotateKey={handleRequestRotate}
                onRevokeKey={handleRevokeKey}
            />

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <AppGeneralSection
                        name={name} setName={setName}
                        description={description} setDescription={setDescription}
                        websiteUrl={websiteUrl} setWebsiteUrl={setWebsiteUrl}
                        currency={currency}
                    />
                    <AppBrandingSection
                        simple
                        logoUrlInput={logoUrlInput} setLogoUrlInput={setLogoUrlInput}
                        themeColor={themeColor} setThemeColor={setThemeColor}
                    />
                </div>

                <AppConfigSection
                    successUrl={successUrl} setSuccessUrl={setSuccessUrl}
                    cancelUrl={cancelUrl} setCancelUrl={setCancelUrl}
                />

                {/* Webhooks */}
                <AppWebhooksSection
                    appId={id}
                    webhookUrl={webhookUrl}
                    setWebhookUrl={setWebhookUrl}
                />

                <Button
                    type="submit"
                    size="lg"
                    disabled={!canSave}
                    className="w-full h-14 text-lg font-black shadow-xl rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t("submitting") : t("save")}
                </Button>
            </form>

            {/* Zone de danger */}
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-destructive">{t("dangerZoneTitle")}</p>
                        <p className="text-xs text-muted-foreground">{t("dangerZoneDesc")}</p>
                    </div>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="shrink-0"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        {t("dangerZoneButton")}
                    </Button>
                </div>
            </div>

            {showKeyActionModal && (
                <KeyActionModal
                    mode={keyActionMode}
                    currentEnvironment={keyEnvironment}
                    isLoading={isKeyLoading}
                    onSubmit={handleKeyAction}
                    onCancel={() => setShowKeyActionModal(false)}
                />
            )}

            {showKeysModal && (
                <ApiKeysRevealModal
                    apiKey={revealedKey || undefined}
                    subtitle={t(keyActionMode === "create" ? "KeysModal.keyCreated" : "KeysModal.keyRotated")}
                    onConfirm={() => setShowKeysModal(false)}
                />
            )}

            <DeleteAppModal
                appId={id}
                appName={appName}
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSuccess={() => router.push("/merchant/apps")}
            />
        </div>
    );
}
