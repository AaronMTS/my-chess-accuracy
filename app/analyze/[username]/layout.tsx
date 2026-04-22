import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="space-y-4 grow max-h-dvh bg-slate-950 overflow-auto">
        <Navbar />
        <main className="space-y-8 max-w-5xl mx-auto pt-2 pb-8 px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
