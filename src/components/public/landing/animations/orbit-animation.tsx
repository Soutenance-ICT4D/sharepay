"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PartnerProps {
  name: string;
  logo: string;
}

export function InfiniteLogos({ partners }: { partners: PartnerProps[] }) {
  // On double la liste pour créer l'effet de boucle infinie sans saut
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full py-20 overflow-hidden bg-background">
      {/* Gradient Overlays pour masquer les bords (effet de fondu) */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex flex-col gap-8">
        {/* Première rangée : Défilement vers la gauche */}
        <div className="flex w-full">
          <motion.div
            className="flex flex-nowrap gap-8"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedPartners.map((partner, idx) => (
              <LogoCard key={`row1-${idx}`} partner={partner} />
            ))}
          </motion.div>
        </div>

        {/* Deuxième rangée : Défilement vers la droite (décalage) */}
        <div className="flex w-full">
          <motion.div
            className="flex flex-nowrap gap-8"
            initial={{ x: -1000 }}
            animate={{ x: [ -1000, 0] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {duplicatedPartners.map((partner, idx) => (
              <LogoCard key={`row2-${idx}`} partner={partner} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LogoCard({ partner }: { partner: PartnerProps }) {
  return (
    <div className="flex-shrink-0 w-40 h-20 lg:w-56 lg:h-28 bg-card border border-primary/10 rounded-2xl flex items-center justify-center p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all group">
      <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}