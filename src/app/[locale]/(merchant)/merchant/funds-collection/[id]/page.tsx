"use client";

import { useState, useMemo, use } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProductDetailsSection } from "@/components/merchant/funds-collection/new/product-details-section";
import { PricingSection } from "@/components/merchant/funds-collection/new/pricing-section";
import { BrandingSection } from "@/components/merchant/funds-collection/new/branding-section";
import { AdvancedOptionsSection } from "@/components/merchant/funds-collection/new/advanced-options-section";
import { FundsCollectionPreview } from "@/components/merchant/funds-collection/new/funds-collection-preview";

export default function EditFundsCollectionPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const t = useTranslations('Dashboard.FundsCollection.Edit');
    const router = useRouter();

    // Mock initial data based on params.id
    const isMock = params.id === "lnk_1";

    // States
    const [showPreview, setShowPreview] = useState(true);
    const [title, setTitle] = useState(isMock ? "Produit Test 1" : "");
    const [description, setDescription] = useState<string>(isMock ? "Description du produit test" : "");
    const [amountType, setAmountType] = useState<"fixed" | "free">(isMock ? "free" : "fixed");
    const [currency, setCurrency] = useState<string>("FCFA");
    const [amount, setAmount] = useState(isMock ? "" : "1500");
    const [appId, setAppId] = useState<string>("");
    const [redirectUrl, setRedirectUrl] = useState<string>("");
    const [expiresAt, setExpiresAt] = useState<string>("");
    const [collectCustomerInfo, setCollectCustomerInfo] = useState<boolean>(true);
    const [logoMode, setLogoMode] = useState<"none" | "upload" | "url">("none");
    const [logoUrlInput, setLogoUrlInput] = useState<string>("");
    const [logoDataUrl, setLogoDataUrl] = useState<string>("");
    const [themeColor, setThemeColor] = useState<string>("#0f172a");
    const [error, setError] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        if (title.trim().length < 3) return false;
        if (amountType === "free") return true;
        const parsed = Number(amount);
        return Number.isFinite(parsed) && parsed > 0;
    }, [amount, amountType, title]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const cleanTitle = title.trim();
        if (cleanTitle.length < 3) {
            setError("Le titre doit contenir au moins 3 caractères.");
            return;
        }

        toast.success(t("successMessage"));
        router.push('/merchant/funds-collection');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                        {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                        {showPreview ? t("hidePreview") : t("showPreview")}
                    </Button>
                </div>
            </div>

            <div className={`grid grid-cols-1 xl:max-w-7xl xl:mx-auto gap-8 lg:gap-12 ${showPreview ? 'lg:grid-cols-12' : ''}`}>
                {/* Form Column */}
                <div className={`${showPreview ? 'lg:col-span-7 xl:col-span-7' : 'max-w-4xl mx-auto w-full'} space-y-8 lg:space-y-12`}>
                    <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">

                        <ProductDetailsSection
                            appId={appId} setAppId={setAppId}
                            title={title} setTitle={setTitle}
                            description={description} setDescription={setDescription}
                        />

                        <PricingSection
                            amountType={amountType} setAmountType={setAmountType}
                            currency={currency} setCurrency={setCurrency}
                            amount={amount} setAmount={setAmount}
                        />

                        <BrandingSection
                            logoMode={logoMode} setLogoMode={setLogoMode}
                            logoUrlInput={logoUrlInput} setLogoUrlInput={setLogoUrlInput}
                            logoDataUrl={logoDataUrl} setLogoDataUrl={setLogoDataUrl}
                            themeColor={themeColor} setThemeColor={setThemeColor}
                        />

                        <AdvancedOptionsSection
                            redirectUrl={redirectUrl} setRedirectUrl={setRedirectUrl}
                            expiresAt={expiresAt} setExpiresAt={setExpiresAt}
                            collectCustomerInfo={collectCustomerInfo} setCollectCustomerInfo={setCollectCustomerInfo}
                        />

                        {error && (
                            <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button type="submit" size="lg" disabled={!canSubmit} className="w-full h-14 text-lg font-black shadow-xl rounded-xl">
                            {t("submit")}
                        </Button>
                    </form>
                </div>

                {/* Preview Column */}
                {showPreview && (
                    <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative">
                        <FundsCollectionPreview data={{
                            title,
                            description,
                            amountValue: Number(amount),
                            currency,
                            amountType,
                            themeColor,
                            logoUrl: logoMode === 'url' ? logoUrlInput : logoDataUrl
                        }} />
                    </div>
                )}
            </div>
        </div>
    );
}
