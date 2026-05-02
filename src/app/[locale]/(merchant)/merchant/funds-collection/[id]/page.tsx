"use client";

import { useState, useMemo, use, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetailsSection } from "@/components/merchant/funds-collection/new/product-details-section";
import { PricingSection } from "@/components/merchant/funds-collection/new/pricing-section";
import { BrandingSection } from "@/components/merchant/funds-collection/new/branding-section";
import { AdvancedOptionsSection } from "@/components/merchant/funds-collection/new/advanced-options-section";
import { FundsCollectionPreview } from "@/components/merchant/funds-collection/new/funds-collection-preview";

import { fundCollectionsService, useFundCollection } from "@/features/merchant/fund-collections";
import { useApps } from "@/features/merchant/apps";
import { resolveError } from "@/lib/api/response-codes";

export default function EditFundsCollectionPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params);
    const t = useTranslations('Dashboard.FundsCollection.Edit');
    const tGlobal = useTranslations('Errors');
    const router = useRouter();

    const { data: collection, loading: loadingCollection, error: loadError } = useFundCollection(id);
    const { data: apps, loading: appsLoading } = useApps();

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
    const [error, setError] = useState<string | null>(null);

    // Populate form when collection loads
    useEffect(() => {
        if (!collection) return;
        setTitle(collection.title);
        setDescription(collection.description ?? "");
        setAmountType(collection.amountFixed ? "fixed" : "free");
        setAmount(collection.amount != null ? String(collection.amount) : "");
        setAppId(collection.applicationId ?? "");
        setThankYouMessage(collection.thankYouMessage ?? "");
        setCoverImageUrl(collection.coverImageUrl ?? "");
        setCollectCustomerInfo(collection.collectCustomerInfo);
        if (collection.expiresAt) {
            // Convert ISO string to datetime-local format (YYYY-MM-DDTHH:mm)
            setExpiresAt(collection.expiresAt.slice(0, 16));
        }
    }, [collection]);

    const canSubmit = useMemo(() => {
        if (title.trim().length < 3) return false;
        if (amountType === "free") return true;
        const parsed = Number(amount);
        return Number.isFinite(parsed) && parsed > 0;
    }, [amount, amountType, title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || isSubmitting) return;

        setError(null);
        setIsSubmitting(true);
        try {
            await fundCollectionsService.update(id, {
                title: title.trim(),
                description: description.trim() || undefined,
                coverImageUrl: coverImageUrl.trim() || undefined,
                isAmountFixed: amountType === "fixed",
                amount: amountType === "fixed" ? Number(amount) : undefined,
                expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
                removeExpiresAt: !expiresAt && !!collection?.expiresAt,
                collectCustomerInfo,
                thankYouMessage: thankYouMessage.trim() || undefined,
            });
            toast.success(t("successMessage"));
            router.push('/merchant/funds-collection');
        } catch (err: unknown) {
            const { messageKey, values } = resolveError(err);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingCollection) {
        return (
            <div className="space-y-8">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-72" />
                    <Skeleton className="h-4 w-56" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-5 space-y-8">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-48 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-destructive font-medium mb-4">{t("loadError")}</p>
                <Button variant="outline" onClick={() => router.push('/merchant/funds-collection')}>
                    Retour
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">{t("title")}</h2>
                <p className="text-sm text-muted-foreground font-medium mt-1 truncate">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                <div className="lg:col-span-5 space-y-8 lg:space-y-12">
                    <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
                        <ProductDetailsSection
                            appId={appId} setAppId={setAppId}
                            title={title} setTitle={setTitle}
                            description={description} setDescription={setDescription}
                            apps={apps ?? null} appsLoading={appsLoading}
                        />
                        <PricingSection
                            amountType={amountType} setAmountType={setAmountType}
                            amount={amount} setAmount={setAmount}
                        />
                        <BrandingSection
                            coverImageUrl={coverImageUrl} setCoverImageUrl={setCoverImageUrl}
                        />
                        <AdvancedOptionsSection
                            thankYouMessage={thankYouMessage} setThankYouMessage={setThankYouMessage}
                            expiresAt={expiresAt} setExpiresAt={setExpiresAt}
                            collectCustomerInfo={collectCustomerInfo} setCollectCustomerInfo={setCollectCustomerInfo}
                        />

                        {error && (
                            <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={!canSubmit || isSubmitting}
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
    );
}
