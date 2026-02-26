"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2 } from "lucide-react";
import { appsService } from "@/core/services/apps.service";
import { toast } from "sonner";

interface DeleteAppModalProps {
    appId: string;
    appName: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function DeleteAppModal({
    appId,
    appName,
    isOpen,
    onClose,
    onSuccess,
}: DeleteAppModalProps) {
    const t = useTranslations("Dashboard.Apps.DeleteDialog");
    const [confirmName, setConfirmName] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const isConfirmed = confirmName === appName;

    const handleDelete = async () => {
        if (!isConfirmed || isDeleting) return;

        setIsDeleting(true);
        try {
            await appsService.remove(appId);
            toast.success(t("success"));
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(t("error") + " : " + (error.message || "UNKNOWN_ERROR"));
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertTriangle className="h-5 w-5" />
                        <DialogTitle>{t("title")}</DialogTitle>
                    </div>
                    <DialogDescription>
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="confirmName" className="text-sm font-medium">
                            {t("confirmText")} <span className="font-bold">{appName}</span>
                        </Label>
                        <Input
                            id="confirmName"
                            placeholder={appName}
                            value={confirmName}
                            onChange={(e) => setConfirmName(e.target.value)}
                            className="bg-background"
                            autoComplete="off"
                        />
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={!isConfirmed || isDeleting}
                        className="gap-2"
                    >
                        {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {t("confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
