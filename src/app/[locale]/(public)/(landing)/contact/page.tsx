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
                    <div className="lg:col-span-5 space-y-8">
                        <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t('emailTitle')}</h3>
                                <p className="text-muted-foreground">contact@sharepay.com</p>
                                <p className="text-muted-foreground">support@sharepay.com</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t('phoneTitle')}</h3>
                                <p className="text-muted-foreground">+237 600 00 00 00</p>
                                <p className="text-muted-foreground">+237 600 00 00 01</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t('addressTitle')}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('address')}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{t('hoursTitle')}</h3>
                                <p className="text-muted-foreground">{t('weekday')}</p>
                                <p className="text-muted-foreground">{t('saturday')}</p>
                                <div className="mt-2 text-emerald-500 text-sm font-semibold flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    {t('support247')}
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
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('form.phone')}</Label>
                                <PhoneInput 
                                    id="phone"
                                    defaultCountry="CM"
                                    className="rounded-md"
                                    placeholder={t('form.placeholderPhone')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t('form.email')}</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder={t('form.placeholderEmail')}
                                    className="rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>{t('form.reason')}</Label>
                                <Select>
                                    <SelectTrigger className="rounded-md bg-transparent">
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
                                    className="min-h-[180px] rounded-md resize-none" 
                                    placeholder={t('form.placeholderMessage')} 
                                />
                            </div>

                            <Button className="w-full rounded-md h-11 font-semibold transition-all flex items-center justify-center gap-2">
                                {t('form.submit')}
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
