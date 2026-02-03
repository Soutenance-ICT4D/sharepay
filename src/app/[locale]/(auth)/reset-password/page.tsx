"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/core/i18n/routing";
import { useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";

export default function ResetPasswordPage() {
    // Ideally adding 'Auth.ResetPassword' keys later
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call to reset password
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to login
            router.push('/login');
        }, 2000);
    }

    return (
        <div className="p-8 space-y-6 text-center">
            <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LockKeyhole className="h-6 w-6" />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Create new password</h1>
                <p className="text-sm text-muted-foreground">Your new password must be different from previously used passwords.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 text-left">
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Set New Password
                </Button>
            </form>
        </div>
    );
}
