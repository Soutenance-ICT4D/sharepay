"use client";

import { useState } from "react";
import { PaymentLinkInfo } from "@/core/types/payment.types";
import { PaymentLinkDetails } from "./payment-link-details";
import { PaymentMethodsForm } from "./payment-methods-form";
import { PaymentMerchantHero } from "./payment-merchant-hero";
import { ShieldCheck } from "lucide-react";

interface PaymentLinkContentProps {
    id: string;
    linkInfo: PaymentLinkInfo;
}

export function PaymentLinkContent({ id, linkInfo }: PaymentLinkContentProps) {
    const [amount, setAmount] = useState<number>(linkInfo.amount);
    const [customerInfo, setCustomerInfo] = useState({
        fullName: "",
        email: ""
    });

    return (
        <div className="max-w-6xl mx-auto w-full">
            <PaymentMerchantHero
                title={linkInfo.title}
                logoUrl={linkInfo.logoUrl}
                description={linkInfo.description}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left card: amount & customer info */}
                <PaymentLinkDetails
                    paymentLink={linkInfo}
                    onAmountChange={setAmount}
                    onCustomerInfoChange={setCustomerInfo}
                />

                {/* Right card: payment methods */}
                <div className="space-y-6">
                    <PaymentMethodsForm
                        id={id}
                        type="LINK"
                        amount={amount}
                        customerInfo={customerInfo}
                        collectCustomerInfo={linkInfo.collectCustomerInfo}
                    />

                    <div className="flex items-center justify-center p-4 bg-primary/5 rounded-xl border border-primary/10 space-x-3 text-primary/70 text-center">
                        <ShieldCheck className="h-5 w-5 shrink-0" />
                        <span className="text-xs font-semibold">Transactions sécurisée et chiffrées par SharePay.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
