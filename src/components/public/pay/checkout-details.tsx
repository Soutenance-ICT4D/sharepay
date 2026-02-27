"use client";

import { CheckoutSessionInfo } from "@/core/types/payment.types";
import { formatCurrency, formatAmount } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, ShoppingCart, Timer, FileText, Hash } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutDetailsProps {
    session: CheckoutSessionInfo;
    onCustomerInfoChange?: (info: { fullName: string; email: string }) => void;
}

export function CheckoutDetails({ session, onCustomerInfoChange }: CheckoutDetailsProps) {
    const locale = useLocale();
    const [timeLeft, setTimeLeft] = useState<string>("--:--");
    const [fullName, setFullName] = useState(session.fullName || "");
    const [email, setEmail] = useState(session.email || "");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(session.expiresAt).getTime() - new Date().getTime();
            if (difference <= 0) return "00:00";

            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [session.expiresAt]);

    return (
        <Card className="w-full h-full shadow-sm border-primary/5">
            <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                    <CardTitle>
                        Détails du paiement <span className="text-primary ml-1">({session.currency})</span>
                    </CardTitle>
                    <div className="flex items-center text-xs font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-lg shadow-sm">
                        <Timer className="h-3.5 w-3.5 mr-1.5" />
                        {timeLeft}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {/* --- AMOUNT SECTION --- */}
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Montant total</span>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary break-words">
                            {formatAmount(session.amount, session.currencyName, locale)}
                        </span>
                    </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-dashed">
                    <div className="flex justify-between items-center text-sm py-2">
                        <div className="flex items-center text-muted-foreground space-x-2">
                            <Hash className="h-4 w-4" />
                            <span>Référence</span>
                        </div>
                        <span className="font-mono font-medium">{session.reference}</span>
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
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    onCustomerInfoChange?.({ fullName, email: e.target.value });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    );
}
