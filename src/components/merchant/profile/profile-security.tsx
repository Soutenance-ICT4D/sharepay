import { Shield, KeyRound, ShieldCheck, Monitor, Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { UserProfileData, ActiveSession } from "@/lib/data/mock-profile";

interface ProfileSecurityProps {
    security: UserProfileData['security'];
    sessions: ActiveSession[];
}

export function ProfileSecurity({ security, sessions }: ProfileSecurityProps) {
    const t = useTranslations('Dashboard.Profile.Security');

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Shield className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t('title')}</h3>
            </div>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-card rounded-xl border border-border shadow-sm gap-4">
                    <div className="flex gap-4">
                        <div className="bg-blue-500/10 p-2.5 rounded-lg h-fit">
                            <KeyRound className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-base">{t('passwordTitle')}</p>
                            <p className="text-sm text-muted-foreground">{t('passwordDesc')} {security.lastPasswordChange}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto font-bold rounded-xl border-input">{t('passwordChange')}</Button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-card rounded-xl border border-border shadow-sm gap-4">
                    <div className="flex gap-4">
                        <div className="bg-purple-500/10 p-2.5 rounded-lg h-fit">
                            <ShieldCheck className="text-purple-600 dark:text-purple-400 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-base">{t('twoFactorTitle')}</p>
                            <p className="text-sm text-muted-foreground">{t('twoFactorDesc')}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto sm:justify-end">
                        {security.twoFactorEnabled && <span className="text-sm font-medium text-muted-foreground mr-2">{t('twoFactorActive')}</span>}
                        <button className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${security.twoFactorEnabled ? 'bg-primary' : 'bg-muted'}`}>
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${security.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                        </button>
                    </div>
                </div>

                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <p className="font-bold">{t('sessionsTitle')}</p>
                            <p className="text-sm text-muted-foreground">{t('sessionsDesc')}</p>
                        </div>
                        <button className="text-sm font-bold text-destructive hover:text-destructive/80 transition-colors">{t('sessionsDisconnect')}</button>
                    </div>
                    <div className="divide-y divide-border">
                        {sessions.map((session) => (
                            <div key={session.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    {session.device.toLowerCase().includes('iphone') || session.device.toLowerCase().includes('android') ? (
                                        <Smartphone className="text-muted-foreground w-5 h-5" />
                                    ) : (
                                        <Monitor className="text-muted-foreground w-5 h-5" />
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold">{session.browser} sur {session.device} {session.isCurrent && `(${t('sessionCurrent')})`}</p>
                                        <p className="text-xs text-muted-foreground">{session.location} • {session.ipAddress} {!session.isCurrent && `• ${session.lastActive}`}</p>
                                    </div>
                                </div>
                                {session.isCurrent ? (
                                    <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">{t('sessionActive')}</span>
                                ) : (
                                    <button className="text-muted-foreground hover:text-destructive transition-colors"><X className="w-5 h-5" /></button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
