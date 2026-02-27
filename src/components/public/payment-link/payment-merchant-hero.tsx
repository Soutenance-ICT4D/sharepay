"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store } from "lucide-react";

interface PaymentMerchantHeroProps {
    title: string;
    logoUrl?: string;
    description: string;
}

export function PaymentMerchantHero({ title, logoUrl, description }: PaymentMerchantHeroProps) {
    return (
        <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <Avatar className="h-20 w-20 border-2 border-primary/10 shadow-sm bg-background">
                <AvatarImage src={logoUrl} alt={title} />
                <AvatarFallback>
                    <Store className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
            </div>
        </div>
    );
}
