"use client";

import { useState, useCallback } from "react";
import { AdminPageHeading } from "@/components/admin/overview/admin-page-heading";
import { useProviders } from "@/features/admin/providers/hooks/use-providers";
import { adminProvidersService } from "@/features/admin/providers/services/providers.service";
import { AdminProviderResponse, PaymentProviderType, UpsertProviderRequest } from "@/features/admin/providers/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, RefreshCw, Pencil, Power } from "lucide-react";
import { toast } from "sonner";

const TYPE_LABELS: Record<PaymentProviderType, string> = {
    MOBILE_MONEY: "Mobile Money",
    BANK_TRANSFER: "Virement bancaire",
    CARD: "Carte",
    CRYPTO: "Crypto",
    WALLET: "Portefeuille",
};

const EMPTY_FORM: UpsertProviderRequest = {
    code: "",
    name: "",
    type: "MOBILE_MONEY",
    country: "",
    currency: "",
    feePercentage: 0,
    feeFixed: 0,
    minAmount: 100,
    maxAmount: 1000000,
};

export default function AdminProvidersPage() {
    const { data, loading, error, refetch } = useProviders();

    const [showForm, setShowForm] = useState(false);
    const [editTarget, setEditTarget] = useState<AdminProviderResponse | null>(null);
    const [form, setForm] = useState<UpsertProviderRequest>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    const openCreate = () => {
        setEditTarget(null);
        setForm(EMPTY_FORM);
        setShowForm(true);
    };

    const openEdit = (provider: AdminProviderResponse) => {
        setEditTarget(provider);
        setForm({
            code: provider.code,
            name: provider.name,
            type: provider.type,
            country: provider.country,
            currency: provider.currency,
            feePercentage: provider.feePercentage,
            feeFixed: provider.feeFixed,
            minAmount: provider.minAmount,
            maxAmount: provider.maxAmount,
        });
        setShowForm(true);
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editTarget) {
                await adminProvidersService.update(editTarget.id, form);
                toast.success("Provider mis à jour");
            } else {
                await adminProvidersService.create(form);
                toast.success("Provider créé");
            }
            setShowForm(false);
            refetch();
        } catch {
            toast.error("Erreur lors de l'opération");
        } finally {
            setSubmitting(false);
        }
    }, [editTarget, form, refetch]);

    const handleToggle = useCallback(async (provider: AdminProviderResponse) => {
        setTogglingId(provider.id);
        try {
            await adminProvidersService.toggle(provider.id);
            toast.success(provider.active ? "Provider désactivé" : "Provider activé");
            refetch();
        } catch {
            toast.error("Erreur lors du changement d'état");
        } finally {
            setTogglingId(null);
        }
    }, [refetch]);

    const setField = <K extends keyof UpsertProviderRequest>(key: K, value: UpsertProviderRequest[K]) =>
        setForm(f => ({ ...f, [key]: value }));

    return (
        <div className="space-y-6">
            <AdminPageHeading
                title="Providers de Paiement"
                subtitle="Configurez et gérez les opérateurs de paiement disponibles"
                action={
                    <Button onClick={openCreate}>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouveau provider
                    </Button>
                }
            />

            <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                </Button>
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Pays</TableHead>
                            <TableHead>Devise</TableHead>
                            <TableHead>Frais %</TableHead>
                            <TableHead>Frais fixe</TableHead>
                            <TableHead>Min / Max</TableHead>
                            <TableHead>État</TableHead>
                            <TableHead className="w-24" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 10 }).map((__, j) => (
                                        <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center text-destructive py-10">
                                    Erreur lors du chargement
                                </TableCell>
                            </TableRow>
                        ) : !data?.length ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center text-muted-foreground py-10">
                                    Aucun provider configuré
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-mono text-sm">{p.code}</TableCell>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{TYPE_LABELS[p.type]}</Badge>
                                    </TableCell>
                                    <TableCell>{p.country.toUpperCase()}</TableCell>
                                    <TableCell>{p.currency.toUpperCase()}</TableCell>
                                    <TableCell>{p.feePercentage}%</TableCell>
                                    <TableCell>{p.feeFixed.toLocaleString("fr-FR")}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {p.minAmount.toLocaleString("fr-FR")} / {p.maxAmount.toLocaleString("fr-FR")}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={p.active ? "default" : "secondary"}>
                                            {p.active ? "Actif" : "Inactif"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => openEdit(p)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={`h-8 w-8 ${p.active ? "text-destructive hover:text-destructive" : "text-emerald-600 hover:text-emerald-600"}`}
                                                onClick={() => handleToggle(p)}
                                                disabled={togglingId === p.id}
                                            >
                                                <Power className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create / Edit dialog */}
            <Dialog open={showForm} onOpenChange={(o) => !o && setShowForm(false)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editTarget ? "Modifier le provider" : "Nouveau provider"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Code</Label>
                                <Input
                                    id="code"
                                    value={form.code}
                                    onChange={(e) => setField("code", e.target.value)}
                                    maxLength={50}
                                    required
                                    disabled={!!editTarget}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom</Label>
                                <Input
                                    id="name"
                                    value={form.name}
                                    onChange={(e) => setField("name", e.target.value)}
                                    maxLength={100}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={form.type} onValueChange={(v) => setField("type", v as PaymentProviderType)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {(Object.keys(TYPE_LABELS) as PaymentProviderType[]).map((t) => (
                                        <SelectItem key={t} value={t}>{TYPE_LABELS[t]}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays (ISO)</Label>
                                <Input
                                    id="country"
                                    value={form.country}
                                    onChange={(e) => setField("country", e.target.value.toUpperCase())}
                                    maxLength={3}
                                    placeholder="CI"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="currency">Devise (ISO)</Label>
                                <Input
                                    id="currency"
                                    value={form.currency}
                                    onChange={(e) => setField("currency", e.target.value.toUpperCase())}
                                    maxLength={3}
                                    placeholder="XOF"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="feePercentage">Frais (%)</Label>
                                <Input
                                    id="feePercentage"
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    value={form.feePercentage}
                                    onChange={(e) => setField("feePercentage", parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="feeFixed">Frais fixe</Label>
                                <Input
                                    id="feeFixed"
                                    type="number"
                                    min={0}
                                    value={form.feeFixed}
                                    onChange={(e) => setField("feeFixed", parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="minAmount">Montant min</Label>
                                <Input
                                    id="minAmount"
                                    type="number"
                                    min={1}
                                    value={form.minAmount}
                                    onChange={(e) => setField("minAmount", parseInt(e.target.value) || 1)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxAmount">Montant max</Label>
                                <Input
                                    id="maxAmount"
                                    type="number"
                                    min={1}
                                    value={form.maxAmount}
                                    onChange={(e) => setField("maxAmount", parseInt(e.target.value) || 1)}
                                    required
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={submitting}>
                                {editTarget ? "Mettre à jour" : "Créer"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
