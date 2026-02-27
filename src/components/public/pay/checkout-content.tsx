"use client";

import { useState } from "react";
import { CheckoutSessionInfo } from "@/core/types/payment.types";
import { CheckoutDetails } from "./checkout-details";
import { PaymentMethodsForm } from "../payment-link/payment-methods-form";
import { PaymentMerchantHero } from "../payment-link/payment-merchant-hero";
import { ShieldCheck } from "lucide-react";

interface CheckoutContentProps {
    id: string;
    sessionInfo: CheckoutSessionInfo;
}

export function CheckoutContent({ id, sessionInfo }: CheckoutContentProps) {
    const [customerInfo, setCustomerInfo] = useState({
        fullName: sessionInfo.fullName || "",
        email: sessionInfo.email || ""
    });

    return (
        <div className="max-w-6xl mx-auto w-full">
            <PaymentMerchantHero
                title={sessionInfo.title}
                logoUrl={sessionInfo.logoUrl}
                description={sessionInfo.description}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left card: amount & customer info */}
                <div className="space-y-6">
                    <CheckoutDetails
                        session={sessionInfo}
                        onCustomerInfoChange={setCustomerInfo}
                    />
                </div>

                {/* Right card: payment methods */}
                <div className="space-y-6">
                    <PaymentMethodsForm
                        id={id}
                        type="CHECKOUT"
                        amount={sessionInfo.amount}
                        customerInfo={customerInfo}
                        collectCustomerInfo={false} // Always optional as requested
                        initialMethod={sessionInfo.paymentMethod}
                        initialPhone={sessionInfo.phoneNumber}
                    />

                    <div className="flex items-center justify-center p-4 bg-primary/5 rounded-xl border border-primary/10 space-x-3 text-primary/70 text-center">
                        <ShieldCheck className="h-5 w-5 shrink-0" />
                        <span className="text-xs font-semibold">Transactions sécurisée et chiffrées par SharePay.</span>
                    </div>

                    {sessionInfo.callbackUrl && (
                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Vous serez redirigé vers le site du marchand après le paiement.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
