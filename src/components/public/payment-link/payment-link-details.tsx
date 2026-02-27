"use client";

import { PaymentLinkInfo } from "@/core/types/payment.types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AmountInput } from "@/components/ui/amount-input";
import { useState } from "react";

interface PaymentLinkDetailsProps {
    paymentLink: PaymentLinkInfo;
    onAmountChange?: (amount: number) => void;
    onCustomerInfoChange?: (info: { fullName: string; email: string }) => void;
}

export function PaymentLinkDetails({ paymentLink, onAmountChange, onCustomerInfoChange }: PaymentLinkDetailsProps) {
    const locale = useLocale();
    const t = useTranslations("Footer"); // For general labels or use own namespace

    const [editableAmount, setEditableAmount] = useState(paymentLink.amount.toString());
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const isFixed = paymentLink.type === 'FIXED';

    return (
        <Card className="w-full h-full shadow-sm border-primary/5">
            <CardHeader pb-0>
                <CardTitle>
                    Montant à payer <span className="text-primary ml-1">({paymentLink.currency})</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* --- AMOUNT SECTION --- */}
                <div className="space-y-3">
                    <AmountInput
                        value={editableAmount}
                        onChange={(val) => {
                            setEditableAmount(val);
                            onAmountChange?.(Number(val));
                        }}
                        disabled={isFixed}
                        currency={paymentLink.currencyName}
                    />
                </div>

                {/* --- CUSTOMER INFO SECTION --- */}
                <div className="space-y-4 pt-4 border-t border-dashed">
                    <div className="space-y-2">
                        <Label htmlFor="cust-name">
                            Votre nom complet <span className="text-muted-foreground text-[10px] ml-1 uppercase">(Optionnel)</span>
                        </Label>
                        <Input
                            id="cust-name"
                            placeholder="Jean Dupont"
                            value={fullName}
                            required={false}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                onCustomerInfoChange?.({ fullName: e.target.value, email });
                            }}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cust-email">
                            Votre adresse email <span className="text-muted-foreground text-[10px] ml-1 uppercase">(Optionnel)</span>
                        </Label>
                        <Input
                            id="cust-email"
                            type="email"
                            placeholder="jean.dupont@example.com"
                            value={email}
                            required={false}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                onCustomerInfoChange?.({ fullName, email: e.target.value });
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
