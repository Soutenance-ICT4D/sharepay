import { paymentService } from "@/core/services/payment.service";
import { PaymentHeader } from "@/components/public/payment/payment-header";
import { PaymentFooter } from "@/components/public/payment/payment-footer";
import { redirect } from "next/navigation";
import { PaymentProcessResponse } from "@/core/types/payment.types";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { CheckoutContent } from "@/components/public/pay/checkout-content";

interface PayPageProps {
    params: Promise<{
        locale: string;
        code: string;
    }>;
}

export default async function PayPage({ params }: PayPageProps) {
    const { code, locale } = await params;

    let sessionInfo = null;
    let errorMsg = null;
    const messages = await getMessages();

    try {
        sessionInfo = await paymentService.getCheckoutSession(code);
    } catch (e: any) {
        redirect("/?error=invalid_session");
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <PaymentHeader />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 pt-4 pb-12 min-h-[90vh]">



                {sessionInfo && (
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <CheckoutContent id={code} sessionInfo={sessionInfo} />
                    </NextIntlClientProvider>
                )}

            </main>

            <PaymentFooter />
        </div>
    );
}
