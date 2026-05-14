"use client";

import { ShieldCheck, Mail, Phone, CreditCard, CheckCircle2, Clock, XCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/data/mock-profile";

interface ProfileKycSectionProps {
    kyc: UserProfileData["kyc"];
    email: string;
    phone: string;
}

type ItemStatus = "approved" | "uploaded" | "missing" | "rejected";

const statusStyle: Record<ItemStatus, { badge: string; icon: React.ElementType; iconColor: string }> = {
    approved: { badge: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30", icon: CheckCircle2, iconColor: "text-green-500" },
    uploaded: { badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30", icon: Clock,         iconColor: "text-amber-500" },
    missing:  { badge: "bg-muted text-muted-foreground border-border",                            icon: XCircle,       iconColor: "text-muted-foreground" },
    rejected: { badge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",         icon: XCircle,       iconColor: "text-red-500" },
};

function VerifRow({
    icon: Icon,
    label,
    value,
    status,
    onUpload,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    status: ItemStatus;
    onUpload?: () => void;
}) {
    const t = useTranslations("Dashboard.Profile.Kyc");
    const cfg = statusStyle[status];
    const StatusIcon = cfg.icon;

    return (
        <div className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
            <div className="bg-primary/10 p-2.5 rounded-xl shrink-0">
                <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground truncate">{value}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <StatusIcon className={`w-4 h-4 ${cfg.iconColor}`} />
                <Badge variant="outline" className={`text-xs font-medium ${cfg.badge}`}>
                    {t(`docStatus_${status}`)}
                </Badge>
                {(status === "missing" || status === "rejected") && onUpload && (
                    <Button type="button" variant="outline" size="sm" className="gap-1.5 text-xs ml-1" onClick={onUpload}>
                        <Upload className="w-3 h-3" />
                        {t("upload")}
                    </Button>
                )}
            </div>
        </div>
    );
}

export function ProfileKycSection({ kyc, email, phone }: ProfileKycSectionProps) {
    const t = useTranslations("Dashboard.Profile.Kyc");
    const idCard = kyc.documents.find((d) => d.type === "id_card");

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden divide-y divide-border">
                <VerifRow
                    icon={Mail}
                    label={t("emailLabel")}
                    value={email}
                    status="approved"
                />
                <VerifRow
                    icon={Phone}
                    label={t("phoneLabel")}
                    value={phone}
                    status="approved"
                />
                <VerifRow
                    icon={CreditCard}
                    label={t("idCardLabel")}
                    value={idCard?.uploadedAt ? t("uploadedAt", { date: idCard.uploadedAt }) : t("notUploaded")}
                    status={idCard?.status ?? "missing"}
                    onUpload={() => {}}
                />
            </div>
        </section>
    );
}
