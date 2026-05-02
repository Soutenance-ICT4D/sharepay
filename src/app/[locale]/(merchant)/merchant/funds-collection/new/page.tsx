"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/routing";
import { toast } from "sonner";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { ProductDetailsSection } from "@/components/merchant/funds-collection/new/product-details-section";
import { PricingSection } from "@/components/merchant/funds-collection/new/pricing-section";
import { BrandingSection } from "@/components/merchant/funds-collection/new/branding-section";
import { AdvancedOptionsSection } from "@/components/merchant/funds-collection/new/advanced-options-section";
import { FundsCollectionPreview } from "@/components/merchant/funds-collection/new/funds-collection-preview";

import { fundCollectionsService } from "@/features/merchant/fund-collections";
import { useApps } from "@/features/merchant/apps";
import { resolveError } from "@/lib/api/response-codes";

export default function NewFundsCollectionPage() {
    const t = useTranslations('Dashboard.FundsCollection.New');
    const tGlobal = useTranslations('Errors');
    const router = useRouter();

    const { data: apps, loading: appsLoading } = useApps();
    const activeApps = apps?.filter((a) => a.status === "ACTIVE") ?? [];
    const hasNoActiveApp = !appsLoading && activeApps.length === 0;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amountType, setAmountType] = useState<"fixed" | "free">("fixed");
    const [amount, setAmount] = useState("");
    const [appId, setAppId] = useState("");
    const [thankYouMessage, setThankYouMessage] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [collectCustomerInfo, setCollectCustomerInfo] = useState(true);
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ appId?: string; title?: string; amount?: string }>({});

    const clearError = (field: keyof typeof fieldErrors) =>
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        const errors: typeof fieldErrors = {};
        if (!appId) errors.appId = t("validation.appRequired");
        if (title.trim().length < 3) errors.title = t("validation.titleTooShort");
        if (amountType === "fixed") {
            const parsed = Number(amount);
            if (!Number.isFinite(parsed) || parsed <= 0) errors.amount = t("validation.amountInvalid");
        }
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setFieldErrors({});
        setIsSubmitting(true);
        try {
            const collection = await fundCollectionsService.create(appId, {
                title: title.trim(),
                description: description.trim() || undefined,
                coverImageUrl: coverImageUrl.trim() || undefined,
                currency: "XAF",
                isAmountFixed: amountType === "fixed",
                amount: amountType === "fixed" ? Number(amount) : undefined,
                expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
                collectCustomerInfo,
                thankYouMessage: thankYouMessage.trim() || undefined,
            });
            toast.success(t("successMessage"));
            router.push(`/merchant/funds-collection/${collection.id}`);
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ── Skeleton pendant le chargement des apps ──────────────────────────── */
    if (appsLoading) {
        return (
            <div className="space-y-8">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">{t("title")}</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{t("subtitle")}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 space-y-8 lg:space-y-12">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-xl" />
                        ))}
                    </div>
                    <div className="hidden lg:block lg:col-span-7">
                        <div className="sticky top-8">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4 rounded" />
                                    <Skeleton className="h-4 w-32 rounded" />
                                </div>
                                <Skeleton className="h-8 w-[72px] rounded-lg" />
                            </div>
                            {/* Frame web */}
                            <div className="relative bg-[#f8fafc] overflow-hidden border border-border rounded-xl shadow-xl">
                                {/* Browser bar */}
                                <div className="absolute top-0 inset-x-0 h-9 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-2 z-10">
                                    <div className="flex gap-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-200" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-200" />
                                    </div>
                                    <Skeleton className="ml-3 flex-1 h-5 rounded" />
                                </div>
                                {/* Content */}
                                <div className="px-6 py-5 space-y-4" style={{ paddingTop: "2.75rem" }}>
                                    {/* Logo + titre */}
                                    <div className="flex flex-col items-center gap-1.5">
                                        <Skeleton className="h-7 w-24 rounded" />
                                        <Skeleton className="h-4 w-40 rounded" />
                                    </div>
                                    {/* Grille 2 colonnes */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Carte gauche */}
                                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                            <Skeleton className="h-14 w-full rounded-none shrink-0" />
                                            <div className="p-3 space-y-3">
                                                <Skeleton className="h-14 w-full rounded-lg" />
                                                <Skeleton className="h-7 w-full rounded-lg" />
                                                <Skeleton className="h-7 w-full rounded-lg" />
                                            </div>
                                        </div>
                                        {/* Carte droite */}
                                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col gap-3">
                                            <Skeleton className="h-4 w-20 rounded" />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Skeleton className="h-14 rounded-lg" />
                                                <Skeleton className="h-14 rounded-lg" />
                                            </div>
                                            <Skeleton className="h-8 w-full rounded-xl" />
                                            <Skeleton className="mt-auto h-9 w-full rounded-xl" />
                                        </div>
                                    </div>
                                    {/* Footer */}
                                    <div className="flex justify-center py-1">
                                        <Skeleton className="h-3 w-48 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ── Modal : aucune application active ─────────────────────────── */}
            <Dialog open={hasNoActiveApp}>
                <DialogContent
                    hideCloseButton
                    className="
                        left-3 right-3 bottom-3 top-auto w-auto translate-x-0 translate-y-0 rounded-2xl
                        sm:left-[50%] sm:right-auto sm:bottom-auto sm:top-[50%]
                        sm:w-full sm:max-w-md sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg
                    "
                >
                    <DialogHeader className="items-center text-center">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-2">
                            <Image src="/icons/apps.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                        </div>
                        <DialogTitle>{t("NoAppModal.title")}</DialogTitle>
                        <DialogDescription>
                            {t("NoAppModal.description")}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex-col gap-2 mt-2 sm:flex-col">
                        <Button asChild className="w-full font-bold">
                            <Link href="/merchant/apps/new">
                                <Image src="/icons/apps.png" alt="" width={16} height={16} className="h-4 w-4 object-contain mr-2" />
                                {t("NoAppModal.createApp")}
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("NoAppModal.goBack")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ── Formulaire ────────────────────────────────────────────────── */}
            <div className="space-y-8">
                <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">{t("title")}</h2>
                    <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{t("subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 space-y-8 lg:space-y-12">
                        <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
                            <ProductDetailsSection
                                appId={appId}
                                setAppId={(v) => { setAppId(v); clearError("appId"); }}
                                title={title}
                                setTitle={(v) => { setTitle(v); clearError("title"); }}
                                description={description} setDescription={setDescription}
                                apps={activeApps} appsLoading={false}
                                appIdError={fieldErrors.appId}
                                titleError={fieldErrors.title}
                            />
                            <PricingSection
                                amountType={amountType} setAmountType={setAmountType}
                                amount={amount}
                                setAmount={(v) => { setAmount(v); clearError("amount"); }}
                                amountError={fieldErrors.amount}
                            />
                            <BrandingSection
                                coverImageUrl={coverImageUrl} setCoverImageUrl={setCoverImageUrl}
                            />
                            <AdvancedOptionsSection
                                thankYouMessage={thankYouMessage} setThankYouMessage={setThankYouMessage}
                                expiresAt={expiresAt} setExpiresAt={setExpiresAt}
                                collectCustomerInfo={collectCustomerInfo} setCollectCustomerInfo={setCollectCustomerInfo}
                            />

                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="w-full h-14 text-lg font-black shadow-xl rounded-xl"
                            >
                                {isSubmitting ? t("submitting") : t("submit")}
                            </Button>
                        </form>
                    </div>

                    <div className="hidden lg:block lg:col-span-7 relative">
                        <FundsCollectionPreview data={{
                            title,
                            description,
                            amountValue: Number(amount),
                            currency: "XAF",
                            amountType,
                            coverImageUrl: coverImageUrl || undefined,
                            collectCustomerInfo,
                        }} />
                    </div>
                </div>
            </div>
        </>
    );
}
