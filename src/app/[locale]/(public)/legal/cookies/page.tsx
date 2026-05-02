"use client";

export default function CookiesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8">Politique relative aux Cookies</h1>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          SharePay utilise des cookies pour améliorer votre expérience, assurer la sécurité de vos sessions et analyser le trafic sur notre plateforme.
        </p>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Qu'est-ce qu'un cookie ?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Un cookie est un petit fichier texte déposé sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. 
              Ils sont largement utilisés pour faire fonctionner les sites web de manière plus efficace.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold">2. Types de cookies utilisés</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-2">Cookies Essentiels</h3>
                <p className="text-sm text-muted-foreground">Nécessaires au fonctionnement du site, pour l'authentification et la prévention de la fraude. Ils ne peuvent pas être désactivés.</p>
              </div>

              <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                <h3 className="font-bold mb-2">Cookies Analytiques</h3>
                <p className="text-sm text-muted-foreground">Nous permettent de comprendre comment les visiteurs interagissent avec notre site afin d'améliorer la navigation et le contenu.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. Gestion de vos préférences</h2>
            <p className="text-muted-foreground leading-relaxed">
              Vous pouvez configurer votre navigateur pour bloquer ou vous alerter sur ces cookies, mais certaines parties de notre plateforme ne fonctionneront plus correctement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
