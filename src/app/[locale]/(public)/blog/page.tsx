"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    title: "L'avenir des paiements en Afrique : Tendances 2026",
    excerpt: "Découvrez comment l'agrégation de paiements transforme le paysage financier continental et ce que cela signifie pour votre entreprise.",
    date: "12 Mars 2026",
    author: "Équipe SharePay",
    category: "Analyse",
    image: "https://images.unsplash.com/photo-1526303328184-bfd65074fb3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Comment optimiser votre taux de conversion avec une API unique",
    excerpt: "Une seule intégration pour accepter toutes les méthodes de paiement locales. Apprenez comment réduire l'abandon de panier.",
    date: "5 Mars 2026",
    author: "Tech Corner",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "SharePay intègre désormais les nouveaux réseaux Wave et Orange Money",
    excerpt: "Nous étendons notre portée pour vous offrir encore plus de flexibilité dans vos transactions quotidiennes à travers la zone CEMAC.",
    date: "28 Février 2026",
    author: "Product Update",
    category: "Annonce",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  const t = useTranslations('Footer');

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog SharePay</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Actualités, guides techniques et analyses sur l'écosystème des paiements numériques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group relative bg-muted/30 rounded-3xl border border-border/50 overflow-hidden hover:bg-muted/50 transition-colors duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-primary font-bold transition-all group-hover:translate-x-1" asChild>
                  <Link href={`/blog/${post.id}`}>
                    Lire l'article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
