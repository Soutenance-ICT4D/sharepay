"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { DevelopersSidebar } from "./developers-sidebar";
import { DevelopersRightNav, RightNavItem } from "./developers-right-nav";
import { DocPagination } from "./doc-pagination";
import { DocSection, flatDocStructure } from "./doc-config";

// Sections
import { DevelopersIntroduction, introductionNavItems } from "./sections/getting-started/developers-introduction";
import { DevelopersAuthentication, authenticationNavItems } from "./sections/getting-started/developers-authentication";

export function DevelopersContent() {
    const t = useTranslations("Developers");
    const tCats = useTranslations("Developers.Categories");
    const tSecs = useTranslations("Developers.Sections");
    const tRightNav = useTranslations("Developers.RightNav");

    const [activeSection, setActiveSection] = useState<DocSection>("introduction");
    const [activeRightNavId, setActiveRightNavId] = useState<string>("");
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Section Content Mapper
    const renderSectionContent = () => {
        switch (activeSection) {
            case "introduction":
                return <DevelopersIntroduction onNavigate={navToSection} />;
            case "authentication":
                return <DevelopersAuthentication />;
            default:
                // Find title from flat structure to display in Under Construction
                const docInfo = flatDocStructure.find(d => d.id === activeSection);
                return (
                    <div className="max-w-[70rem] mx-auto py-20 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-muted/30 rounded-full mb-6 text-muted-foreground/50 border border-border">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">
                            {t("UnderConstructionTitle")} - {tSecs(activeSection)}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                            {t("UnderConstructionDesc")}
                        </p>
                    </div>
                );
        }
    };

    // Right Nav Mapper
    const getRightNavItems = (): RightNavItem[] => {
        let items: RightNavItem[] = [];
        switch (activeSection) {
            case "introduction":
                items = introductionNavItems;
                break;
            case "authentication":
                items = authenticationNavItems;
                break;
            default:
                items = [];
        }

        return items.map(item => ({
            ...item,
            label: tRightNav(item.id),
            isActive: activeRightNavId === item.id || (!activeRightNavId && item.isActive)
        }));
    };

    // Scroll handler for right nav
    const handleRightNavClick = (id: string) => {
        setActiveRightNavId(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Pagination Calculation
    const currentIndex = flatDocStructure.findIndex(item => item.id === activeSection);
    const prevItem = currentIndex > 0 ? flatDocStructure[currentIndex - 1] : undefined;
    const nextItem = currentIndex < flatDocStructure.length - 1 ? flatDocStructure[currentIndex + 1] : undefined;

    const navToSection = (id: string) => {
        setActiveSection(id as DocSection);
        setActiveRightNavId("");
        setIsMobileSidebarOpen(false); // Close mobile drawer when selecting a section
        document.getElementById("docs-main")?.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="max-w-[1920px] mx-auto px-4 xl:px-8 flex flex-col lg:flex-row w-full h-full relative">

            {/* Mobile Top Navigation Toggle */}
            <div className="flex items-center justify-between lg:hidden py-4 border-b border-border/50 bg-background z-20 shrink-0">
                <span className="font-semibold text-foreground text-sm uppercase tracking-wider">{t("DocsNavigation")}</span>
                <button
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className="p-2 -mr-2 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:bg-muted/50 rounded-lg"
                >
                    <Menu className="h-5 w-5" />
                    <span>{t("Menu")}</span>
                </button>
            </div>

            {/* Sidebar Navigation */}
            <DevelopersSidebar
                activeSection={activeSection}
                onSelectSection={navToSection}
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <main id="docs-main" className="flex-1 min-w-0 py-8 px-6 lg:px-12 xl:px-16 overflow-y-auto h-full scroll-smooth custom-scrollbar relative">
                {renderSectionContent()}

                {/* Pagination Footer */}
                <DocPagination
                    prev={prevItem ? { id: prevItem.id, title: tSecs(prevItem.id), section: tCats(prevItem.categoryId) } : undefined}
                    next={nextItem ? { id: nextItem.id, title: tSecs(nextItem.id), section: tCats(nextItem.categoryId) } : undefined}
                    onNavigate={navToSection}
                />
            </main>

            {/* Right Content Outline */}
            <DevelopersRightNav
                items={getRightNavItems()}
                onItemClick={handleRightNavClick}
            />
        </div>
    );
}
