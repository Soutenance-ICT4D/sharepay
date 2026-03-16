"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "@/core/i18n/routing";
import { tokenStorage } from "@/core/lib/token-storage";
import { LoaderPage } from "@/components/shared/loader-page";

export function PublicAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const tokens = tokenStorage.get();
    if (tokens?.accessToken) {
      router.push("/dashboard");
    } else {
      setShouldRender(true);
    }
  }, [router]);

  // Pendant que l'on vérifie l'auth ou que l'on redirige, on affiche le loader
  if (!shouldRender) {
    return <LoaderPage />;
  }

  return (
    <div className="animate-in fade-in duration-500">
      {children}
    </div>
  );
}
