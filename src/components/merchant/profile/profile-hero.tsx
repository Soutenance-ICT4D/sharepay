"use client";

import Image from "next/image";
import { Pencil, Check, Loader2, Upload, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MerchantProfile } from "@/lib/types/account.types";
import { accountService } from "@/lib/services/account.service";
import { isApiError } from "@/lib/api/error";

interface ProfileHeroProps {
    profile:         MerchantProfile;
    onProfileUpdate: (p: MerchantProfile) => void;
}

const KYC_BADGE_CLASS: Record<string, string> = {
    NONE:     "bg-zinc-500/10 text-zinc-500",
    BASIC:    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    ADVANCED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    FULL:     "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

function getInitials(fullName: string): string {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return fullName.slice(0, 2).toUpperCase();
}

export function ProfileHero({ profile, onProfileUpdate }: ProfileHeroProps) {
    const t = useTranslations("Dashboard.Profile");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [modalOpen,   setModalOpen]   = useState(false);
    const [uploading,   setUploading]   = useState(false);
    const [removing,    setRemoving]    = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const badgeClass = KYC_BADGE_CLASS[profile.kycLevel] ?? KYC_BADGE_CLASS.NONE;
    const kycLabelMap = {
        NONE:     t("Hero.kycNone"),
        BASIC:    t("Hero.kycBasic"),
        ADVANCED: t("Hero.kycAdvanced"),
        FULL:     t("Hero.kycFull"),
    } as const;
    const badgeLabel = kycLabelMap[profile.kycLevel as keyof typeof kycLabelMap] ?? kycLabelMap.NONE;

    const joinDate = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" })
        .format(new Date(profile.createdAt));

    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const MAX_SIZE = 1 * 1024 * 1024;

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        e.target.value = "";
        setUploadError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setUploadError(t("Hero.uploadErrorFormat"));
            return;
        }
        if (file.size > MAX_SIZE) {
            setUploadError(t("Hero.uploadErrorSize"));
            return;
        }

        const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        setUploading(true);
        try {
            const updated = await accountService.updateProfile({ avatarUrl: dataUrl });
            onProfileUpdate(updated);
            setModalOpen(false);
        } catch (err) {
            setUploadError(isApiError(err) ? err.message : t("Hero.uploadError"));
        } finally {
            setUploading(false);
        }
    }

    async function handleRemove() {
        setRemoving(true);
        setUploadError(null);
        try {
            const updated = await accountService.updateProfile({ avatarUrl: "" });
            onProfileUpdate(updated);
            setModalOpen(false);
        } catch (err) {
            setUploadError(isApiError(err) ? err.message : t("Hero.uploadError"));
        } finally {
            setRemoving(false);
        }
    }

    const busy = uploading || removing;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-border">
            {/* Avatar */}
            <div className="relative shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl bg-primary/10 flex items-center justify-center select-none">
                    {profile.avatarUrl ? (
                        <Image
                            className="object-cover"
                            alt={profile.fullName}
                            fill
                            src={profile.avatarUrl}
                        />
                    ) : (
                        <span className="text-2xl font-bold text-primary">
                            {getInitials(profile.fullName)}
                        </span>
                    )}
                </div>
                <button
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t("Hero.editAvatar")}
                    onClick={() => { setUploadError(null); setModalOpen(true); }}
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </div>

            {/* Infos */}
            <div className="text-center sm:text-left space-y-1.5">
                <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                <p className="text-muted-foreground text-sm">
                    {profile.email}
                    {profile.emailVerified && (
                        <span className="inline-flex items-center gap-1 ml-2 text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                        </span>
                    )}
                    {" · "}
                    {t("memberSince")} {joinDate}
                </p>
                <div className="flex gap-2 justify-center sm:justify-start flex-wrap">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${badgeClass}`}>
                        {badgeLabel}
                    </span>
                    {profile.status === "ACTIVE" && (
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded uppercase tracking-wider">
                            {t("Hero.statusActive")}
                        </span>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-xs">
                    <DialogHeader>
                        <DialogTitle>{t("Hero.modalTitle")}</DialogTitle>
                    </DialogHeader>

                    {/* Preview */}
                    <div className="flex justify-center py-2">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-border bg-primary/10 flex items-center justify-center">
                            {profile.avatarUrl ? (
                                <Image
                                    className="object-cover"
                                    alt={profile.fullName}
                                    fill
                                    src={profile.avatarUrl}
                                />
                            ) : (
                                <span className="text-2xl font-bold text-primary">
                                    {getInitials(profile.fullName)}
                                </span>
                            )}
                            {busy && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                    </div>

                    {uploadError && (
                        <p className="text-xs text-destructive text-center">{uploadError}</p>
                    )}

                    <div className="flex flex-col gap-2 pt-1">
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={busy}
                            className="w-full gap-2 font-bold rounded-xl"
                        >
                            <Upload className="w-4 h-4" />
                            {t("Hero.modalUpload")}
                        </Button>

                        {profile.avatarUrl && (
                            <Button
                                variant="outline"
                                onClick={handleRemove}
                                disabled={busy}
                                className="w-full gap-2 font-bold rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                                {t("Hero.modalRemove")}
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            onClick={() => setModalOpen(false)}
                            disabled={busy}
                            className="w-full rounded-xl"
                        >
                            {t("Hero.modalCancel")}
                        </Button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
