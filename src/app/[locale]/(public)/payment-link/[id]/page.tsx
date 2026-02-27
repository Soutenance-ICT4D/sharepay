import { paymentService } from "@/core/services/payment.service";
import { PaymentHeader } from "@/components/public/payment/payment-header";
import { PaymentFooter } from "@/components/public/payment/payment-footer";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../../../../components/ui/alert";
import { PaymentLinkContent } from "@/components/public/payment-link/payment-link-content";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface PaymentLinkPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

export default async function PaymentLinkPage({ params }: PaymentLinkPageProps) {
    const { id, locale } = await params;

    // Server-side fetch to load data for SEO/initial paint if needed.
    // In a real scenario you would have proper error boundaries or error.tsx
    let linkInfo = null;
    let errorMsg = null;
    const messages = await getMessages();

    try {
        linkInfo = await paymentService.getPaymentLinkInfo(id);
    } catch (e: any) {
        errorMsg = e.message || "Impossible de charger ce lien de paiement.";
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <PaymentHeader />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 pt-4 pb-24">

                {errorMsg && (
                    <div className="max-w-lg mx-auto">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{errorMsg}</AlertDescription>
                        </Alert>
                    </div>
                )}

                {linkInfo && (
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <PaymentLinkContent id={id} linkInfo={linkInfo} />
                    </NextIntlClientProvider>
                )}

            </main>

            <PaymentFooter />
        </div>
    );
}
