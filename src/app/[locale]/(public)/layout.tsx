export default function PublicBaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Shared Public Header could go here */}
            <main className="flex-1">{children}</main>
            {/* Shared Public Footer could go here */}
        </div>
    );
}
