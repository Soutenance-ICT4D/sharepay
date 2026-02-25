"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/i18n/routing";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AppGeneralSection } from "@/components/dashboard/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/dashboard/apps/sections/app-branding-section";
import { AppKeysSection } from "@/components/dashboard/apps/sections/app-keys-section";
import { AppWebhooksSection } from "@/components/dashboard/apps/sections/app-webhooks-section";

import { ApplicationData } from "@/components/dashboard/apps/app-card";

// Temporary Mock Data
const MOCK_APPS: ApplicationData[] = [
    {
        id: "app_1",
        name: "E-commerce Store",
        description: "Intégration principale pour la boutique en ligne WooCommerce.",
        status: "live",
        createdAt: "2023-11-15T10:00:00Z",
        transactionCount: 1450
    },
    // ... we just need to simulate finding an app
];

export default function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const t = useTranslations("Dashboard.Apps.Form");
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [themeColor, setThemeColor] = useState("#0f172a");
    const [logoUrl, setLogoUrl] = useState("");
    const [webhookUrl, setWebhookUrl] = useState("");
    const [webhookSecret, setWebhookSecret] = useState("");

    // Status state
    const [status, setStatus] = useState<string>("live");

    useEffect(() => {
        // Simulate fetching app data based on ID
        const app = MOCK_APPS.find(a => a.id === id) || {
            name: `Application ${id}`,
            description: "Description simulée",
            status: "test"
        };

        setName(app.name);
        setDescription(app.description || "");
        setStatus(app.status);
        setThemeColor("#3b82f6");
        setLogoUrl("");
        setWebhookUrl("https://api.example.com/webhook");
        setWebhookSecret("whsec_test_secret_key_12345");
    }, [id]);

    const handleGenerateNewSecret = () => {
        setWebhookSecret(`whsec_${Math.random().toString(36).substring(2, 15)}`);
        toast.info(t("Webhooks.generateNew"));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Veuillez entrer un nom d'application.");
            return;
        }

        // Mock saving
        console.log("Saving edited app:", { id, name, description, themeColor, logoUrl, webhookUrl, webhookSecret });
        toast.success("Application modifiée avec succès !");

        router.push("/dashboard/apps");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6 md:p-8 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Button
                    variant="ghost"
                    className="w-fit -ml-4 text-muted-foreground"
                    onClick={() => router.push("/dashboard/apps")}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    {t("backToApps")}
                </Button>
                <div>
                    <h2 className="text-3xl font-black tracking-tight">{t("editTitle")}</h2>
                    <p className="text-muted-foreground">{t("editDescription")}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">

                <div className="p-6 md:p-8 border rounded-xl bg-card shadow-sm space-y-10">
                    <AppGeneralSection
                        name={name} setName={setName}
                        description={description} setDescription={setDescription}
                    />

                    <Separator />

                    <AppBrandingSection
                        themeColor={themeColor} setThemeColor={setThemeColor}
                        logoUrl={logoUrl} setLogoUrl={setLogoUrl}
                    />

                    <Separator />

                    <AppKeysSection
                        publicKey={`pk_${status}_${Math.random().toString(36).substring(2, 10)}`}
                        secretKey={`sk_${status}_${Math.random().toString(36).substring(2, 20)}`}
                    />

                    <Separator />

                    <AppWebhooksSection
                        webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl}
                        webhookSecret={webhookSecret} onGenerateNewSecret={handleGenerateNewSecret}
                    />
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => router.push("/dashboard/apps")}
                    >
                        {t("cancel")}
                    </Button>
                    <Button type="submit" size="lg" className="min-w-[200px] shadow-xl">
                        {t("submitEdit")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
