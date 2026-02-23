"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export function PaymentLinkSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau lien
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Créer un lien de paiement</SheetTitle>
                    <SheetDescription>
                        Configurez votre nouveau lien pour commencer à accepter des paiements.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nom
                        </Label>
                        <Input
                            id="name"
                            placeholder="Ex: Consultation"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Type
                        </Label>
                        <Select defaultValue="fixed">
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Type de montant" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fixed">Montant fixe</SelectItem>
                                <SelectItem value="free">Montant libre</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Prix
                        </Label>
                        <div className="col-span-3 flex items-center gap-2">
                            <Input
                                id="price"
                                placeholder="0"
                                type="number"
                                className="flex-1"
                            />
                            <span className="text-sm font-medium">FCFA</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            placeholder="Description optionnelle"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Créer le lien</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
