"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { paymentService } from "@/core/services/payment.service";
import { PaymentMethodType, PaymentProcessResponse } from "@/core/types/payment.types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, CreditCard, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import Image from "next/image";
import { PhoneInput } from "@/components/ui/phone-input";

interface PaymentMethodsFormProps {
    id: string;
    type: 'LINK' | 'CHECKOUT';
    amount?: number;
    customerInfo?: { fullName: string; email: string };
    collectCustomerInfo?: boolean;
    initialMethod?: PaymentMethodType;
    initialPhone?: string;
    onSuccess?: (response: PaymentProcessResponse) => void;
}

export function PaymentMethodsForm({ id, type, amount, customerInfo, collectCustomerInfo, initialMethod, initialPhone, onSuccess }: PaymentMethodsFormProps) {
    const t = useTranslations("Auth"); // Temporarily using Auth namespace if Payment is not yet defined, adapt as needed.
    const [method, setMethod] = useState<PaymentMethodType>(initialMethod || "ORANGE_MONEY");
    const [phone, setPhone] = useState(initialPhone || "");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<PaymentProcessResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic Validation for mandatory customer info
        if (collectCustomerInfo) {
            if (!customerInfo?.fullName?.trim()) {
                setError("Veuillez saisir votre nom complet.");
                return;
            }
            if (!customerInfo?.email?.trim() || !customerInfo.email.includes('@')) {
                setError("Veuillez saisir une adresse email valide.");
                return;
            }
        }

        // Validation for amount
        if (!amount || amount <= 0) {
            setError("Le montant du paiement doit être supérieur à 0.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await paymentService.processPayment({
                id,
                type,
                paymentMethod: method,
                phoneNumber: phone,
                amount,
                fullName: customerInfo?.fullName,
                email: customerInfo?.email,
            });

            setSuccess(response);
            if (onSuccess) {
                onSuccess(response);
            }
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors du paiement.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <Card className="w-full border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                <CardContent className="pt-6 flex flex-col items-center justify-center text-center space-y-4">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Paiement Réussi</h3>
                        <p className="text-sm text-green-600 dark:text-green-500">{success.message}</p>
                        <p className="text-xs text-green-500/80 mt-2 font-mono">ID: {success.transactionId}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Moyen de paiement</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Erreur</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <RadioGroup defaultValue={method} value={method} onValueChange={(v) => setMethod(v as PaymentMethodType)}>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <RadioGroupItem value="ORANGE_MONEY" id="orange" className="peer sr-only" />
                                <Label
                                    htmlFor="orange"
                                    className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 h-full hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                >
                                    <div className="relative w-12 h-12 mb-2">
                                        <Image src="/images/partners/orange.png" alt="Orange Money" fill className="object-contain" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tight text-center">Orange Money</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="MTN_MONEY" id="mtn" className="peer sr-only" />
                                <Label
                                    htmlFor="mtn"
                                    className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 h-full hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                                >
                                    <div className="relative w-12 h-12 mb-2">
                                        <Image src="/images/partners/mtn.png" alt="MTN Money" fill className="object-contain" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-tight text-center">MTN Money</span>
                                </Label>
                            </div>
                        </div>
                    </RadioGroup>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Numéro de téléphone</Label>
                            <PhoneInput
                                id="phone"
                                placeholder="Ex: 0102030405"
                                value={phone}
                                onChange={setPhone}
                            />
                            <p className="text-xs text-muted-foreground italic">Saisissez le numéro correspondant à votre compte Mobile Money.</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Payer maintenant
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
