import Image from "next/image";
import { Pencil, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { UserProfileData } from "@/lib/data/mock-profile";

interface ProfileHeroProps {
    user: UserProfileData;
}

export function ProfileHero({ user }: ProfileHeroProps) {
    const t = useTranslations('Dashboard.Profile');

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-border">
            <div className="relative group">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted flex flex-shrink-0 items-center justify-center">
                    {user.avatarUrl && user.avatarUrl !== "/images/placeholders/avatar.jpg" ? (
                        <Image
                            className="object-cover"
                            alt={`Portrait de ${user.fullName}`}
                            fill
                            src={user.avatarUrl}
                        />
                    ) : (
                        <User className="w-12 h-12 text-muted-foreground" />
                    )}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform" title={t('Hero.editAvatar')}>
                    <Pencil className="w-4 h-4" />
                </button>
            </div>
            <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-muted-foreground">{user.email} • {t('memberSince')} {user.memberSince}</p>
                {user.isVerified && (
                    <div className="mt-3 flex gap-2 justify-center sm:justify-start">
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded uppercase tracking-wider">{t('verified')}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
