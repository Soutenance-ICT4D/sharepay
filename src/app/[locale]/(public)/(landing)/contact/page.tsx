"use client";
 
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
 
export default function ContactPage() {
    const t = useTranslations('Footer'); // Reusing some keys or just placeholder
 
    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contactez-nous</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Notre équipe d'experts est là pour vous aider à propulser votre business avec les meilleures solutions de paiement.
                    </p>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Email</h3>
                                <p className="text-muted-foreground">contact@sharepay.com</p>
                                <p className="text-muted-foreground">support@sharepay.com</p>
                            </div>
                        </div>
 
                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Téléphone</h3>
                                <p className="text-muted-foreground">+237 600 00 00 00</p>
                                <p className="text-muted-foreground">Lundi - Vendredi, 8h - 18h</p>
                            </div>
                        </div>
 
                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Siège Social</h3>
                                <p className="text-muted-foreground">Douala, Cameroun</p>
                                <p className="text-muted-foreground">Quartier Akwa, Immeuble Horizon</p>
                            </div>
                        </div>
                    </div>
 
                    <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nom</label>
                                    <input className="w-full bg-background border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Jean" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Prénom</label>
                                    <input className="w-full bg-background border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Dupont" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Professionnel</label>
                                <input className="w-full bg-background border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="jean@entreprise.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea className="w-full bg-background border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all min-h-[120px]" placeholder="Dites-nous comment nous pouvons vous aider..." />
                            </div>
                            <Button className="w-full rounded-full h-12 font-bold shadow-lg shadow-primary/20">
                                Envoyer le message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
