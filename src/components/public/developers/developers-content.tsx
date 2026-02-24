"use client";

import { useState } from "react";
import { DevelopersSidebar, DocSection } from "./developers-sidebar";
import { DevelopersRightNav, RightNavItem } from "./developers-right-nav";

// Sections
import { DevelopersIntroduction, introductionNavItems } from "./sections/developers-introduction";
import { DevelopersAuthentication, authenticationNavItems } from "./sections/developers-authentication";

export function DevelopersContent() {
    const [activeSection, setActiveSection] = useState<DocSection>("introduction");
    const [activeRightNavId, setActiveRightNavId] = useState<string>("");

    // Section Content Mapper
    const renderSectionContent = () => {
        switch (activeSection) {
            case "introduction":
                return <DevelopersIntroduction />;
            case "authentication":
                return <DevelopersAuthentication />;
            default:
                return (
                    <div className="max-w-[70rem] mx-auto py-20 text-center">
                        <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
                        <p className="text-muted-foreground">The content for <strong>{activeSection}</strong> is not yet available.</p>
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

    return (
        <div className="max-w-[1600px] mx-auto flex w-full">
            {/* Sidebar Navigation */}
            <DevelopersSidebar
                activeSection={activeSection}
                onSelectSection={(section) => {
                    setActiveSection(section);
                    setActiveRightNavId("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 py-10 px-6 lg:px-12 xl:px-16 overflow-x-hidden pt-24">
                {renderSectionContent()}
            </main>

            {/* Right Content Outline */}
            <DevelopersRightNav
                items={getRightNavItems()}
                onItemClick={handleRightNavClick}
            />
        </div>
    );
}
