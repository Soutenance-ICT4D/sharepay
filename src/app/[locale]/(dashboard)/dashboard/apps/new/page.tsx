"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/core/i18n/routing";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AppGeneralSection } from "@/components/dashboard/apps/sections/app-general-section";
import { AppBrandingSection } from "@/components/dashboard/apps/sections/app-branding-section";

export default function NewAppPage() {
    const t = useTranslations("Dashboard.Apps.Form");
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [themeColor, setThemeColor] = useState("#0f172a");
    const [logoUrl, setLogoUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Veuillez entrer un nom d'application.");
            return;
        }

        // Mock saving
        console.log("Saving new app:", { name, description, themeColor, logoUrl });
        toast.success("Application créée avec succès !");

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
                    <h2 className="text-3xl font-black tracking-tight">{t("createTitle")}</h2>
                    <p className="text-muted-foreground">{t("createDescription")}</p>
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
                        {t("submitCreate")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
