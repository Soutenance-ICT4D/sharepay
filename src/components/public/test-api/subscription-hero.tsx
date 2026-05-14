import { Zap } from "lucide-react";

export function SubscriptionHero() {
    return (
        <section className="relative pt-32 pb-14 px-4 overflow-hidden">
<div className="max-w-2xl mx-auto text-center space-y-5">
                <div className="inline-flex items-center gap-2 text-primary">
                    <Zap className="h-3.5 w-3.5" />
                    <span className="text-xs font-bold">Flux de paiement réel</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Testez notre solution{" "}
                    <span className="text-primary">de paiement</span>
                </h1>
            </div>
        </section>
    );
}
