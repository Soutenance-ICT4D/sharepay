"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, CreditCard, Trophy } from "lucide-react";

export function PaymentLinkStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Liens actifs
                    </CardTitle>
                    <Link className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                        +2 nouveaux ce mois-ci
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total encaissé
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,250,500 FCFA</div>
                    <p className="text-xs text-muted-foreground">
                        +15% par rapport au mois dernier
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Top performance
                    </CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Consultation</div>
                    <p className="text-xs text-muted-foreground">
                        45 transactions (450,000 FCFA)
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
