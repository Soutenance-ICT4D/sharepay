"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { docCategories, DocSection, flatDocStructure, DocSidebarItem } from "./doc-config";

interface DevelopersSidebarProps {
    activeSection: DocSection;
    onSelectSection: (section: DocSection) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function DevelopersSidebar({ activeSection, onSelectSection, isOpen, onClose }: DevelopersSidebarProps) {
    const t = useTranslations("Developers");
    const tCats = useTranslations("Developers.Categories");
    const tSecs = useTranslations("Developers.Sections");

    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
        const initialState: Record<string, boolean> = {};
        // Tous les parents sont ouverts par défaut
        docCategories.forEach(category => {
            initialState[category.id] = true;
        });
        return initialState;
    });

    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    // Update expanded states when the active section changes externally (e.g., Next/Prev buttons)
    useEffect(() => {
        const activeItemData = flatDocStructure.find(item => item.id === activeSection);
        if (activeItemData) {
            // Ensure parent Category is expanded
            setExpandedCategories(prev => ({
                ...prev,
                [activeItemData.categoryId]: true
            }));

            // If navigating to a level-3 child or the level-2 parent itself, ensure it is expanded
            // We search docCategories to find the parent section
            docCategories.forEach(category => {
                category.items.forEach(item => {
                    // Auto-expand if the item itself is active and has children
                    if (item.id === activeSection && item.items && item.items.length > 0) {
                        setExpandedSections(prev => ({
                            ...prev,
                            [item.id]: true
                        }));
                    }
                    // Auto-expand if one of the children is active
                    if (item.items && item.items.some(child => child.id === activeSection)) {
                        setExpandedSections(prev => ({
                            ...prev,
                            [item.id]: true
                        }));
                    }
                });
            });
        }
    }, [activeSection]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const toggleSection = (sectionId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleSelect = (id: DocSection) => {
        onSelectSection(id);
        // We do NOT auto-collapse level-2 sections when clicking around inside them. 
        // The drawer will auto-close via DevelopersContent logic.
    };

    const renderSecondaryItem = (item: DocSidebarItem) => {
        const hasChildren = !!item.items && item.items.length > 0;
        const isExpanded = expandedSections[item.id];

        // Is it the direct active link? Or is one of its children active?
        const isDirectlyActive = activeSection === item.id;
        const isChildActive = hasChildren && item.items!.some(child => child.id === activeSection);
        const isHighlighted = isDirectlyActive || isChildActive;

        return (
            <li key={item.id} className="relative">
                <div
                    className={cn(
                        "w-full flex items-center justify-between rounded-lg transition-colors group cursor-pointer",
                        isHighlighted
                            ? "bg-primary/5 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                >
                    {/* The link part (left side) */}
                    <button
                        className="flex-1 text-left px-3 py-2 font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                        onClick={() => handleSelect(item.id)}
                    >
                        {tSecs(item.id)}
                    </button>

                    {/* The toggle chevron part (right side, if it has children) */}
                    {hasChildren && (
                        <button
                            className="p-2 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={(e) => toggleSection(item.id, e)}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                    )}
                </div>

                {/* Sub-children (Level 3) render */}
                {hasChildren && isExpanded && (
                    <ul className="mt-1 space-y-1 pl-4 border-l border-border/50 ml-3">
                        {item.items!.map((child) => {
                            const isChildActiveNode = activeSection === child.id;
                            return (
                                <li key={child.id}>
                                    <button
                                        onClick={() => handleSelect(child.id)}
                                        className={cn(
                                            "w-full text-left px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-2",
                                            isChildActiveNode
                                                ? "text-primary font-semibold bg-primary/10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        {/* A tiny dot marker for level 3 */}
                                        <span className={cn(
                                            "h-1.5 w-1.5 rounded-full shrink-0",
                                            isChildActiveNode ? "bg-primary" : "bg-muted-foreground/30"
                                        )} />
                                        {tSecs(child.id)}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Drawer */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border h-full overflow-y-auto custom-scrollbar transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-10 shrink-0",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Mobile Header with Close Button */}
                <div className="flex items-center justify-between p-6 lg:hidden border-b border-border/50">
                    <span className="font-bold text-foreground">{t("DocsNavigation")}</span>
                    <button onClick={onClose} className="p-2 -mr-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    {docCategories.map((category) => {
                        const isExpanded = expandedCategories[category.id];

                        return (
                            <div key={category.id} className="w-full">
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="flex items-center justify-between w-full mb-2 group text-left"
                                >
                                    <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                        {tCats(category.id)}
                                    </h5>
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    )}
                                </button>

                                {/* Level 2 Sections */}
                                {isExpanded && (
                                    <ul className="space-y-1.5 mt-3">
                                        {category.items.map(renderSecondaryItem)}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}
