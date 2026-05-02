"use client";

import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations('Footer');

  const sections = [
    {
      title: "1. Acceptation des conditions",
      content: "En utilisant les services de SharePay, vous acceptez sans réserve ces conditions générales d'utilisation. Si vous agissez pour le compte d'une entreprise, vous confirmez avoir le pouvoir légal de l'engager."
    },
    {
      title: "2. Description des services",
      content: "SharePay fournit une infrastructure technologique permettant d'agréger divers moyens de paiement. Nous ne sommes pas une banque, mais un facilitateur technologique de flux financiers."
    },
    {
      title: "3. Frais et facturation",
      content: "L'utilisation de nos services entraîne des frais de transaction et, selon votre plan, des frais d'abonnement mensuels. Tous les tarifs sont indiqués hors taxes applicables."
    },
    {
      title: "4. Limitation de responsabilité",
      content: "SharePay met tout en œuvre pour assurer une disponibilité maximale de 99.9%. Cependant, nous ne saurions être tenus responsables des pannes dues à des tiers (banques, réseaux de télécommunication)."
    }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8">Conditions d'Utilisation</h1>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Dernière mise à jour : 16 Mars 2026. Veuillez lire attentivement ces conditions avant d'utiliser la plateforme SharePay.
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
      </div>
    </div>
  );
}
