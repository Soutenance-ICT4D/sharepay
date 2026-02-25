export type DocSection =
    | "introduction"
    | "authentication"
    | "responses"
    | "responses-success"
    | "responses-failed"
    | "responses-rejected"
    | "errors"
    | "health"
    | "initiate"
    | "status"
    | "payout"
    | "webhooks-config"
    | "webhooks-events"
    | "sdk-js"
    | "sdk-php"
    | "sdk-csharp";

export interface DocSidebarItem {
    id: DocSection;
    title: string;
    items?: DocSidebarItem[]; // Allows for Level 3 sub-sections
}

export interface DocSidebarCategory {
    id: string;
    title: string;
    items: DocSidebarItem[];
}

export const docCategories: DocSidebarCategory[] = [
    {
        id: "getting-started",
        title: "Getting Started",
        items: [
            { id: "introduction", title: "Introduction" },
            { id: "authentication", title: "Authentication" },
            {
                id: "responses",
                title: "Responses",
                items: [
                    { id: "responses-success", title: "Success" },
                    { id: "responses-failed", title: "Failed" },
                    { id: "responses-rejected", title: "Rejected" }
                ]
            },
            { id: "errors", title: "Errors" }
        ]
    },
    {
        id: "api-rest",
        title: "API REST",
        items: [
            { id: "health", title: "Health" },
            { id: "initiate", title: "Initiate" },
            { id: "status", title: "Status" },
            { id: "payout", title: "Payout" }
        ]
    },
    {
        id: "webhooks",
        title: "Webhooks",
        items: [
            { id: "webhooks-config", title: "Configuration" },
            { id: "webhooks-events", title: "Event Types" }
        ]
    },
    {
        id: "sdks",
        title: "SDKs",
        items: [
            { id: "sdk-js", title: "JavaScript" },
            { id: "sdk-php", title: "PHP" },
            { id: "sdk-csharp", title: "C#" }
        ]
    }
];

// Helper to flatten the hierarchical structure for the Next/Prev pagination
export const flatDocStructure = docCategories.flatMap(category => {
    const flatItems: any[] = [];

    category.items.forEach(item => {
        flatItems.push({
            ...item,
            categoryId: category.id,
            categoryTitle: category.title
        });

        // Add children if they exist, linking back to parent category context
        if (item.items) {
            item.items.forEach(subItem => {
                flatItems.push({
                    ...subItem,
                    categoryId: category.id,
                    categoryTitle: category.title,
                    parentTitle: item.title
                });
            });
        }
    });

    return flatItems;
});
