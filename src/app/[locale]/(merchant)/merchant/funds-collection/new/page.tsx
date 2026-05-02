"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ProductDetailsSection } from "@/components/merchant/funds-collection/new/product-details-section";
import { PricingSection } from "@/components/merchant/funds-collection/new/pricing-section";
import { BrandingSection } from "@/components/merchant/funds-collection/new/branding-section";
import { AdvancedOptionsSection } from "@/components/merchant/funds-collection/new/advanced-options-section";
import { FundsCollectionPreview } from "@/components/merchant/funds-collection/new/funds-collection-preview";

import { fundCollectionsService } from "@/features/merchant/fund-collections";
import { resolveError } from "@/lib/api/response-codes";

export default function NewFundsCollectionPage() {
    const t = useTranslations('Dashboard.FundsCollection.New');
    const tGlobal = useTranslations('Errors');
    const router = useRouter();

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

    const canSubmit = useMemo(() => {
        if (!appId) return false;
        if (title.trim().length < 3) return false;
        if (amountType === "free") return true;
        const parsed = Number(amount);
        return Number.isFinite(parsed) && parsed > 0;
    }, [appId, amount, amountType, title]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit || isSubmitting) return;
        if (!appId) {
            setError(t("appRequired"));
            return;
        }

        setError(null);
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
