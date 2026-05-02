"use client";
 
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";

export default function ContactPage() {
    const t = useTranslations('Landing.Contact');

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t('title')}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Infos de contact */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Horaires (Plus visible) */}
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 shadow-sm transition-all duration-300 hover:shadow-md group mb-8">
                            <div className="flex gap-4 items-start">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{t('hoursTitle')}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{t('weekday')}</p>
                                    <p className="text-muted-foreground leading-relaxed">{t('saturday')}</p>
                                    <div className="mt-4 text-emerald-500 text-sm font-bold flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full w-fit">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        {t('support247')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations de contact regroupées */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex gap-4 items-center p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-all duration-300 group">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{t('emailTitle')}</p>
                                    <div className="space-y-0.5">
                                        <p className="font-semibold text-foreground">contact@sharepay.com</p>
                                        <p className="text-sm text-muted-foreground">support@sharepay.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-all duration-300 group">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{t('phoneTitle')}</p>
                                    <div className="space-y-0.5">
                                        <p className="font-semibold text-foreground">+237 600 00 00 00</p>
                                        <p className="text-sm text-muted-foreground">+237 600 00 00 01</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center p-5 rounded-2xl border border-border/50 bg-card/50 hover:bg-muted/30 transition-all duration-300 group">
                                <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{t('addressTitle')}</p>
                                    <p className="font-semibold text-foreground leading-snug">
                                        {t('address')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="lg:col-span-7 bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden p-8">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <Label htmlFor="fullName">{t('form.fullName')}</Label>
                                <Input 
                                    id="fullName"
                                    placeholder={t('form.placeholderFullName')}
                                    className="rounded-xl border-border/50 focus:border-primary/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('form.phone')}</Label>
                                <PhoneInput 
                                    id="phone"
                                    defaultCountry="CM"
                                    className="rounded-xl overflow-hidden"
                                    placeholder={t('form.placeholderPhone')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t('form.email')}</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder={t('form.placeholderEmail')}
                                    className="rounded-xl border-border/50 focus:border-primary/50 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>{t('form.reason')}</Label>
                                <Select>
                                    <SelectTrigger className="rounded-xl bg-transparent border-border/50 focus:border-primary/50 transition-all">
                                        <SelectValue placeholder={t('form.placeholderReason')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="billing">{t('form.reasonBilling')}</SelectItem>
                                        <SelectItem value="partnership">{t('form.reasonPartnership')}</SelectItem>
                                        <SelectItem value="general">{t('form.reasonGeneral')}</SelectItem>
                                        <SelectItem value="support">{t('form.reasonSupport')}</SelectItem>
                                        <SelectItem value="other">{t('form.reasonOther')}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">{t('form.message')}</Label>
                                <Textarea 
                                    id="message"
                                    className="min-h-[180px] rounded-xl border-border/50 focus:border-primary/50 transition-all resize-none" 
                                    placeholder={t('form.placeholderMessage')} 
                                />
                            </div>

                            <Button className="w-full rounded-full h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 mt-4">
                                {t('form.submit')}
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
