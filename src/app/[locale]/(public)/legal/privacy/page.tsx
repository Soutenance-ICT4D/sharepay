"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations('Footer');

  const sections = [
    {
      title: "1. Collecte des données",
      content: "Nous collectons les informations nécessaires au bon fonctionnement de nos services de paiement, notamment vos coordonnées professionnelles et les détails de facturation de votre entreprise."
    },
    {
      title: "2. Utilisation des données",
      content: "Vos données sont utilisées exclusivement pour traiter vos transactions, améliorer nos services et assurer la sécurité de votre compte SharePay."
    },
    {
      title: "3. Partage des données",
      content: "SharePay ne vend jamais vos données personnelles. Nous partageons uniquement les informations requises par les institutions bancaires et régulateurs pour finaliser vos paiements."
    },
    {
      title: "4. Vos droits",
      content: "Conformément à la réglementation sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos informations personnelles à tout moment."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8">Politique de Confidentialité</h1>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Dernière mise à jour : 16 Mars 2026. Chez SharePay, la protection de votre vie privée est notre priorité absolue. 
          Ce document explique comment nous traitons vos informations.
        </p>

        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl bg-muted/50 border border-border/50 text-sm text-muted-foreground italic">
          Pour toute question relative à vos données, contactez notre délégué à la protection des données à dpo@sharepay.com.
        </div>
      </div>
    </div>
  );
}
