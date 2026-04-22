import Sidebar from "@/components/sidebar/Sidebar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      {children}
    </div>
  );
}
