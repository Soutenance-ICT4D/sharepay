"use client";

import { useState } from "react";
import { Eye, Smartphone, Monitor, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface PaymentPreviewProps {
    data: {
        title: string;
        description: string;
        amountValue: number;
        currency: string;
        amountType: "fixed" | "free";
        themeColor: string;
        logoUrl: string | undefined;
    };
}

export function PaymentPreview({ data }: PaymentPreviewProps) {
    const t = useTranslations('Dashboard.PaymentLinks.New');
    const [viewMode, setViewMode] = useState<"mobile" | "web">("mobile");

    return (
        <div className="sticky top-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    <Eye className="w-4 h-4" /> {t("previewTitle")}
                </div>
                <div className="flex items-center bg-muted p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode("mobile")}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        title={t("viewMobile")}
                    >
                        <Smartphone className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("web")}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'web' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        title={t("viewWeb")}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className={`relative mx-auto bg-white overflow-hidden transition-all duration-500 ease-in-out ${viewMode === 'mobile'
                    ? 'border-[8px] border-slate-900 rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl'
                    : 'border border-border rounded-xl h-[550px] w-full max-w-[500px] shadow-xl'
                }`}>
                {/* Simulated Header Bar */}
                {viewMode === 'mobile' ? (
                    <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 rounded-b-xl w-32 mx-auto z-10 transition-opacity duration-300"></div>
                ) : (
                    <div className="absolute top-0 inset-x-0 h-10 bg-slate-100 border-b border-border flex items-center px-4 gap-2 z-10 transition-opacity duration-300">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-4 flex-1 h-6 bg-white rounded flex items-center px-3 text-[10px] text-slate-400 font-mono">
                            sharepay.com/pay/{data.title?.toLowerCase().replace(/\s+/g, '-') || 'link'}
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className={`h-full overflow-y-auto flex flex-col items-center transition-all duration-300 ${viewMode === 'mobile' ? 'pt-12 pb-8 px-6' : 'pt-16 pb-8 px-10'
                    }`}>
                    {data.logoUrl ? (
                        <img src={data.logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover mb-4 border shadow-sm" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border border-dashed">
                            <ImageIcon className="text-slate-300" />
                        </div>
                    )}

                    <h4 className="text-lg font-bold text-center leading-tight mb-2">
                        {data.title || t("previewDefaultTitle")}
                    </h4>
                    <p className="text-xs text-center text-slate-500 mb-6 line-clamp-3">
                        {data.description || t("previewDefaultDesc")}
                    </p>

                    <div className="w-full bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{t("previewAmount")}</span>
                        <div className="text-2xl font-black" style={{ color: data.themeColor }}>
                            {data.amountType === "free" ? "--" : data.amountValue?.toLocaleString()} {data.currency}
                        </div>
                    </div>

                    <div className="w-full space-y-3 mt-auto">
                        <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse" />
                        <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse" />
                        <Button
                            className="w-full h-12 rounded-xl font-bold shadow-lg transition-all"
                            style={{ backgroundColor: data.themeColor, color: '#fff' }}
                        >
                            {t("previewPayBtn")}
                        </Button>
                    </div>

                    <p className="mt-6 text-[10px] text-slate-400 flex items-center gap-1">
                        <Smartphone className="w-3 h-3" /> {t("previewSecured")}
                    </p>
                </div>
            </div>
        </div>
    );
}
