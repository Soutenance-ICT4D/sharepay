"use client";

import { useMemo } from "react";
import { OverviewPageHeading } from "@/components/merchant/overview/overview-page-heading";
import { OverviewStatsGrid } from "@/components/merchant/overview/overview-stats-grid";
import { OverviewRecentActivity } from "@/components/merchant/overview/overview-recent-activity";
import {
    Headphones,
    MessageSquare,
    CheckCircle2,
    Clock,
    UserCheck,
    AlertCircle,
    LifeBuoy,
    Search,
    Tickets
} from "lucide-react";

export default function SupportDashboardPage() {
    const stats = [
        {
            label: "Tickets Ouverts",
            value: "24",
            badge: { label: "-5%", className: "text-emerald-600 bg-emerald-500/10" },
            icon: <MessageSquare className="h-5 w-5" />,
            iconWrapClassName: "bg-blue-500/10 text-blue-600",
            progress: { value: 30, className: "bg-blue-500" },
        },
        {
            label: "Temps de Réponse",
            value: "1h 15m",
            badge: { label: "Excellent", className: "text-emerald-600 bg-emerald-500/10" },
            icon: <Clock className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
            progress: { value: 85, className: "bg-amber-500" },
        },
        {
            label: "Satisfaction Client",
            value: "4.8/5",
            badge: { label: "+0.2", className: "text-emerald-600 bg-emerald-500/10" },
            icon: <UserCheck className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
            progress: { value: 96, className: "bg-emerald-500" },
        },
    ];

    const tickets = [
        {
            id: "tk-1",
            title: "Problème intégration PHP",
            meta: "Marchand: Boutique Alpha • Créé il y a 10 min",
            amount: "NOUVEAU",
            status: "Urgent",
            amountClassName: "text-primary",
            statusClassName: "text-primary/70",
            icon: <AlertCircle className="h-5 w-5" />,
            iconWrapClassName: "bg-primary/10 text-primary",
        },
        {
            id: "tk-2",
            title: "Demande de remboursement",
            meta: "Client: Jean Dupont • Créé il y a 45 min",
            amount: "EN COURS",
            status: "Normal",
            amountClassName: "text-amber-600",
            statusClassName: "text-amber-600/70",
            icon: <Clock className="h-5 w-5" />,
            iconWrapClassName: "bg-amber-500/10 text-amber-600",
        },
        {
            id: "tk-3",
            title: "Compte bloqué (2FA)",
            meta: "Marchand: Tech Solutions • Résolu il y a 2h",
            amount: "RESOLU",
            status: "Terminé",
            amountClassName: "text-emerald-600",
            statusClassName: "text-emerald-600/70",
            icon: <CheckCircle2 className="h-5 w-5" />,
            iconWrapClassName: "bg-emerald-500/10 text-emerald-600",
        },
    ];

    return (
        <div className="space-y-8 p-6 md:p-8 pt-6">
            <OverviewPageHeading
                title="Centre de Support"
                subtitle="Gestion de l'assistance et des tickets SharePay 2026"
            />

            <OverviewStatsGrid stats={stats as any} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <OverviewRecentActivity
                    title="Tickets de Support Récents"
                    viewAllLabel="Voir tous les tickets"
                    items={tickets as any}
                    onViewAll={() => { }}
                />

                <div className="space-y-6">
                    <div className="p-8 border rounded-2xl bg-gradient-to-br from-blue-500/10 to-primary/10 border-blue-100 dark:border-blue-900/30 flex flex-col items-center text-center">
                        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-4">
                            <LifeBuoy className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Besoin d'aide ?</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm">
                            Consultez la base de connaissances interne ou contactez un superviseur pour les cas complexes.
                        </p>
                        <div className="flex gap-4 w-full max-w-xs">
                            <button className="flex-1 h-11 bg-primary text-primary-foreground rounded-lg font-medium shadow-sm hover:bg-primary/90 transition-all">
                                Base de savoir
                            </button>
                        </div>
                    </div>

                    <div className="p-6 border rounded-xl bg-card shadow-sm space-y-4">
                        <h3 className="font-semibold flex items-center space-x-2">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <span>Recherche Marchand rapide</span>
                        </h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Email, ID ou Téléphone..."
                                className="flex-1 h-10 px-3 border rounded-lg bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button className="px-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80">
                                Trouver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
