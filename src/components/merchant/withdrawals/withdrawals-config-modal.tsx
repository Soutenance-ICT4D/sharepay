"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

export type WithdrawalType = "manual" | "instant" | "threshold" | "periodic";

interface WithdrawalsConfigModalProps {
    currentType: WithdrawalType;
    onSave: (type: WithdrawalType) => void;
}

export function WithdrawalsConfigModal({ currentType, onSave }: WithdrawalsConfigModalProps) {
    const t = useTranslations("Dashboard.Withdrawals");
    const [open, setOpen] = useState(false);

    // Initialise with parent's type, but let user change it locally first
    const [selectedType, setSelectedType] = useState<WithdrawalType>(currentType);

    const handleSave = () => {
        onSave(selectedType);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="shrink-0 rounded-xl">
                    <Settings className="w-4 h-4 mr-2" />
                    {t("configureWithdrawals")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">{t("ConfigModal.title")}</DialogTitle>
                    <DialogDescription className="text-base mt-2">
                        {t("ConfigModal.description")}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {/* Manual */}
                    <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="manual"
                                className="mt-1 w-5 h-5"
                                checked={selectedType === "manual"}
                                onCheckedChange={(c) => c && setSelectedType("manual")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="manual" className="text-base font-semibold cursor-pointer">{t("ConfigModal.types.manual")}</Label>
                                <p className="text-sm text-muted-foreground">{t("ConfigModal.descriptions.manual")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Instant */}
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="instant"
                                className="mt-1 w-5 h-5"
                                checked={selectedType === "instant"}
                                onCheckedChange={(c) => c && setSelectedType("instant")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="instant" className="text-base font-semibold cursor-pointer">{t("ConfigModal.types.instant")}</Label>
                                <p className="text-sm text-muted-foreground">{t("ConfigModal.descriptions.instant")}</p>
                            </div>
                        </div>
                        {selectedType === "instant" && (
                            <div className="pl-8 pt-2">
                                <Label className="mb-2 block text-sm font-medium">{t("ConfigModal.fields.destination")}</Label>
                                <Select defaultValue="default">
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder={t("ConfigModal.fields.destinationPlaceholder")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">{t("ConfigModal.fields.destinationDefault")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Threshold */}
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="threshold"
                                className="mt-1 w-5 h-5"
                                checked={selectedType === "threshold"}
                                onCheckedChange={(c) => c && setSelectedType("threshold")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="threshold" className="text-base font-semibold cursor-pointer">{t("ConfigModal.types.threshold")}</Label>
                                <p className="text-sm text-muted-foreground">{t("ConfigModal.descriptions.threshold")}</p>
                            </div>
                        </div>
                        {selectedType === "threshold" && (
                            <div className="pl-8 pt-2 space-y-4">
                                <div>
                                    <Label className="mb-2 block text-sm font-medium">{t("ConfigModal.fields.thresholdAmount")}</Label>
                                    <Input className="h-11" type="number" placeholder={t("ConfigModal.fields.thresholdAmountPlaceholder")} />
                                </div>
                                <div>
                                    <Label className="mb-2 block text-sm font-medium">{t("ConfigModal.fields.destination")}</Label>
                                    <Select defaultValue="default">
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder={t("ConfigModal.fields.destinationPlaceholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">{t("ConfigModal.fields.destinationDefault")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Periodic */}
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="periodic"
                                className="mt-1 w-5 h-5"
                                checked={selectedType === "periodic"}
                                onCheckedChange={(c) => c && setSelectedType("periodic")}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="periodic" className="text-base font-semibold cursor-pointer">{t("ConfigModal.types.periodic")}</Label>
                                <p className="text-sm text-muted-foreground">{t("ConfigModal.descriptions.periodic")}</p>
                            </div>
                        </div>
                        {selectedType === "periodic" && (
                            <div className="pl-8 pt-2 space-y-4">
                                <div>
                                    <Label className="mb-2 block text-sm font-medium">{t("ConfigModal.fields.period")}</Label>
                                    <Select defaultValue="monthly">
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder={t("ConfigModal.fields.periodPlaceholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">{t("ConfigModal.fields.daily")}</SelectItem>
                                            <SelectItem value="weekly">{t("ConfigModal.fields.weekly")}</SelectItem>
                                            <SelectItem value="monthly">{t("ConfigModal.fields.monthly")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="mb-2 block text-sm font-medium">{t("ConfigModal.fields.destination")}</Label>
                                    <Select defaultValue="default">
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder={t("ConfigModal.fields.destinationPlaceholder")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="default">{t("ConfigModal.fields.destinationDefault")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <Button className="h-11 px-8 text-base font-semibold" onClick={handleSave}>
                        {t("ConfigModal.fields.save")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
