"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendHorizonal } from "lucide-react";

interface WithdrawalsFormProps {
    disabled?: boolean;
}

export function WithdrawalsForm({ disabled }: WithdrawalsFormProps) {
    const t = useTranslations('Dashboard.Withdrawals.Form');

    const [amount, setAmount] = useState("");
    const [destination, setDestination] = useState("");

    const mockDestinations = [
        { id: "dest_1", name: "MTN MoMo - •••• 1234", type: "momo" },
        { id: "dest_2", name: "Carte Visa - •••• 4242", type: "card" }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !destination) {
            toast.error("Veuillez remplir tous les champs");
            return;
        }

        toast.success("Demande de retrait envoyée !");
        setAmount("");
        setDestination("");
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent className={disabled ? "opacity-50 pointer-events-none" : ""}>
                {disabled && (
                    <div className="mb-4 p-3 bg-muted text-muted-foreground text-sm font-medium rounded-lg text-center">
                        Ce formulaire de retrait manuel est désactivé lorsqu'un retrait automatique (Instantané, Seuil, Périodique) est configuré.
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <Label htmlFor="amount" className="text-sm font-medium">{t("amountLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="amount"
                                type="number"
                                placeholder={t("amountPlaceholder")}
                                className="h-12 pl-4 pr-16 bg-muted/50 rounded-xl"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                                FCFA
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="destination" className="text-sm font-medium">{t("destinationLabel")}</Label>
                        <Select value={destination} onValueChange={setDestination}>
                            <SelectTrigger id="destination" className="h-12 bg-muted/50 rounded-xl">
                                <SelectValue placeholder={t("destinationPlaceholder")} />
                            </SelectTrigger>
                            <SelectContent>
                                {mockDestinations.map(dest => (
                                    <SelectItem key={dest.id} value={dest.id}>
                                        {dest.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button disabled={disabled} type="submit" size="lg" className="w-full h-12 rounded-xl text-base font-semibold shadow-lg group">
                        {t("submit")}
                        <SendHorizonal className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
