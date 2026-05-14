"use client";

import { useState } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/data/mock-profile";
import { PhoneInput } from "@/components/ui/phone-input";

interface ProfileInformationProps {
    user: UserProfileData;
}

export function ProfileInformation({ user }: ProfileInformationProps) {
    const t = useTranslations("Dashboard.Profile.Information");

    const [fullName,    setFullName]    = useState(user.fullName);
    const [phone,       setPhone]       = useState(user.phone);
    const [entityType,  setEntityType]  = useState(user.business.entityType);
    const [sector,      setSector]      = useState(user.business.sector);
    const [address,     setAddress]     = useState(user.business.address);
    const [city,        setCity]        = useState(user.business.city);
    const [companyName, setCompanyName] = useState(user.business.companyName);
    const [website,     setWebsite]     = useState(user.business.website);

    const hasChanges =
        fullName    !== user.fullName             ||
        phone       !== user.phone               ||
        entityType  !== user.business.entityType ||
        sector      !== user.business.sector     ||
        address     !== user.business.address    ||
        city        !== user.business.city       ||
        companyName !== user.business.companyName ||
        website     !== user.business.website;

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <UserCircle className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nom complet */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>{t("fullName")}</Label>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-background" />
                    </div>

                    {/* Email (lecture seule) */}
                    <div className="space-y-2">
                        <Label>{t("email")}</Label>
                        <Input value={user.email} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                    </div>

                    {/* Téléphone */}
                    <div className="space-y-2">
                        <Label>{t("phone")}</Label>
                        <PhoneInput value={phone} onChange={setPhone} className="w-full" />
                    </div>

                    {/* Séparateur */}
                    <div className="md:col-span-2 border-t border-border" />

                    {/* Entité */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>{t("entityType")}</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {(["individual", "company"] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setEntityType(type)}
                                    className={`rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                        entityType === type
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                                    }`}
                                >
                                    <p className="font-bold text-sm">{t(`entityType_${type}`)}</p>
                                    <p className="text-xs mt-0.5 opacity-70">{t(`entityType_${type}_desc`)}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Raison sociale + site web (si entreprise) */}
                    {entityType === "company" && (
                        <>
                            <div className="space-y-2">
                                <Label>{t("companyName")}</Label>
                                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="bg-background" />
                            </div>
                            <div className="space-y-2">
                                <Label>{t("website")}</Label>
                                <Input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className="bg-background" />
                            </div>
                        </>
                    )}

                    {/* Secteur */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>{t("sector")}</Label>
                        <Input value={sector} onChange={(e) => setSector(e.target.value)} className="bg-background" />
                    </div>

                    {/* Adresse */}
                    <div className="space-y-2">
                        <Label>{t("address")}</Label>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} className="bg-background" />
                    </div>

                    {/* Ville */}
                    <div className="space-y-2">
                        <Label>{t("city")}</Label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} className="bg-background" />
                    </div>

                    {/* Pays (lecture seule) */}
                    <div className="space-y-2 md:col-span-2">
                        <Label>{t("country")}</Label>
                        <Input value={user.business.country} disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button disabled={!hasChanges} className="font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                        {t("save")}
                    </Button>
                </div>
            </div>
        </section>
    );
}
