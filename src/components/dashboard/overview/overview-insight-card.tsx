"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface OverviewInsightCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    actionLabel?: string;
}

export function OverviewInsightCard({
    title,
    description,
    icon,
    actionLabel = "Voir plus"
}: OverviewInsightCardProps) {
    return (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="p-3 bg-background rounded-full border shadow-sm text-primary">
                    {icon}
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {actionLabel && (
                    <Button variant="default" size="sm">
                        {actionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
