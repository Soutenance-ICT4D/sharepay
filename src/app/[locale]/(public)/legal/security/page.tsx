"use client";

import { ShieldCheck, Lock, EyeOff, Terminal } from "lucide-react";

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "Conformité PCI-DSS",
      description: "Notre infrastructure est certifiée au plus haut niveau de sécurité pour le traitement des données de paiement."
    },
    {
      icon: Lock,
      title: "Chiffrement AES-256",
      description: "Toutes les données sensibles sont chiffrées au repos et en transit via des protocoles TLS 1.3 de pointe."
    },
    {
      icon: EyeOff,
      title: "Anonymisation proactive",
      description: "Nous utilisons la tokenisation pour que les données réelles des cartes ne transitent jamais directement par vos serveurs."
    },
    {
      icon: Terminal,
      title: "Audit et Surveillance",
      description: "Nos systèmes font l'objet de tests de pénétration réguliers et d'une surveillance 24/7 contre les tentatives de fraude."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Sécurité des Paiements</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chez SharePay, la sécurité n'est pas une option, c'est le fondement de chaque ligne de code que nous écrivons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="p-8 rounded-3xl bg-muted/30 border border-border/50 space-y-4">
              <div className="bg-primary/10 p-3 rounded-2xl w-fit text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2.5rem] text-center">
          <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">Votre confiance est notre priorité</h2>
          <p className="text-muted-foreground">
            Nous collaborons avec les meilleurs experts en cybersécurité pour garantir que votre argent et vos données sont toujours protégés par les technologies les plus robustes au monde.
          </p>
        </div>
      </div>
    </div>
  );
}
