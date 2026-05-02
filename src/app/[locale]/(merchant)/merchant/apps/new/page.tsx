"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/merchant/page-heading";
import { AppGeneralSection } from "@/components/merchant/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/merchant/apps/sections/app-branding-section";
import { AppConfigSection } from "@/components/merchant/apps/sections/app-config-section";

import { appsService } from "@/features/merchant/apps";
import { resolveError } from "@/lib/api/response-codes";

function isValidUrl(url: string): boolean {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

const urlOk = (u: string) => !u.trim() || isValidUrl(u.trim());

export default function NewAppPage() {
    const t = useTranslations("Dashboard.Apps.Form");
    const tGlobal = useTranslations();
    const router = useRouter();

    // ── General ───────────────────────────────────────────────────────────────
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");

    // ── Branding ──────────────────────────────────────────────────────────────
    const [logoUrlInput, setLogoUrlInput] = useState("");
    const [themeColor, setThemeColor] = useState("#088a5c");

    // ── Config ────────────────────────────────────────────────────────────────
    const [webhookUrl, setWebhookUrl] = useState("");
    const [successUrl, setSuccessUrl] = useState("");
    const [cancelUrl, setCancelUrl] = useState("");

    // ── Submission ────────────────────────────────────────────────────────────
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; desc?: string }>({});
    const [forceShowUrlErrors, setForceShowUrlErrors] = useState(false);

    const clearError = (field: keyof typeof fieldErrors) =>
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        const errors: typeof fieldErrors = {};
        if (name.trim().length < 2) errors.name = t("validation.nameTooShort");
        if (description.trim().length < 2) errors.desc = t("validation.descTooShort");

        const hasUrlError = !urlOk(websiteUrl) || !urlOk(logoUrlInput) || !urlOk(webhookUrl) || !urlOk(successUrl) || !urlOk(cancelUrl);

        if (Object.keys(errors).length > 0 || hasUrlError) {
            setFieldErrors(errors);
            if (hasUrlError) setForceShowUrlErrors(true);
            return;
        }

        setFieldErrors({});
        setForceShowUrlErrors(false);
        setIsSubmitting(true);
        try {
            const app = await appsService.create({
                name: name.trim(),
                description: description.trim(),
                currency: "XAF",
                websiteUrl: websiteUrl.trim() || undefined,
                logoUrl: logoUrlInput.trim() || null,
                themeColor,
                webhookUrl: webhookUrl.trim() || undefined,
                successUrl: successUrl.trim() || undefined,
                cancelUrl: cancelUrl.trim() || undefined,
            });

            toast.success(t("createSuccess"));
            router.push(`/merchant/apps/${app.id}`);
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageHeading
                title={t("createTitle")}
                subtitle={t("createDescription")}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* General + Branding côte à côte */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <AppGeneralSection
                        name={name}
                        setName={(v) => { setName(v); clearError("name"); }}
                        description={description}
                        setDescription={(v) => { setDescription(v); clearError("desc"); }}
                        websiteUrl={websiteUrl} setWebsiteUrl={setWebsiteUrl}
                        currency="XAF"
                        nameError={fieldErrors.name}
                        descError={fieldErrors.desc}
                        forceShowWebsiteUrlError={forceShowUrlErrors}
                    />
                    <AppBrandingSection
                        simple
                        logoUrlInput={logoUrlInput}
                        setLogoUrlInput={setLogoUrlInput}
                        themeColor={themeColor}
                        setThemeColor={setThemeColor}
                        forceShowErrors={forceShowUrlErrors}
                    />
                </div>

                {/* Configuration pleine largeur */}
                <AppConfigSection
                    webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl}
                    successUrl={successUrl} setSuccessUrl={setSuccessUrl}
                    cancelUrl={cancelUrl} setCancelUrl={setCancelUrl}
                    forceShowErrors={forceShowUrlErrors}
                />

                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-black shadow-xl rounded-xl"
                >
                    {isSubmitting ? t("submitting") : t("submitCreate")}
                </Button>
            </form>

        </div>
    );
}
