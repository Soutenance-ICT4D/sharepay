"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DemoModalProps {
    children?: React.ReactNode;
}

export function DemoModal({ children }: DemoModalProps) {
    const t = useTranslations('Landing.Hero');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div suppressHydrationWarning className="contents">
                    {children || (
                        <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-10 border-2 shadow-sm hover:bg-muted/50 w-full sm:w-auto transition-all duration-300">
                            <Play className="mr-2 h-4 w-4 fill-current" />
                            {t('ctaDemo')}
                        </Button>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black/95 border-none">
                <DialogTitle className="sr-only">Live Demo</DialogTitle>
                <div className="relative aspect-video w-full rounded-lg overflow-hidden flex items-center justify-center">
                    {/* Placeholder content while waiting for the MP4 video */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 text-center p-6">
                        <Play className="h-16 w-16 mb-4 opacity-30" />
                        <h3 className="text-xl font-semibold mb-2">Live Demo Video</h3>
                        <p className="max-w-md text-sm text-balance">
                            Quand ta vidéo sera prête, place-la dans "public/videos/demo.mp4" et décommente le code ci-dessous.
                        </p>

                        
                        === À DÉCOMMENTER QUAND LA VIDÉO EST PRÊTE ===
                        <video 
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            autoPlay
                            muted // Recommandé pour l'autoplay sur beaucoup de navigateurs
                            loop
                            playsInline
                        >
                            <source src="/videos/demo.mp4" type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                       
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
