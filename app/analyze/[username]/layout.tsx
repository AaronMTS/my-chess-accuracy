import CustomErrorBoundary from "@/app/custom-error-boundary";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarContextProvider from "@/store/sidebar-context";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarContextProvider>
      <div className="relative flex min-h-dvh">
        <CustomErrorBoundary>
          <Sidebar />
          <div className="grow flex flex-col gap-4 max-h-dvh bg-slate-950 overflow-auto">
            <Navbar hasSidebarBtn={true} />
            <main className="space-y-8 grow w-full max-w-5xl mx-auto pt-2 pb-8 px-8">
              {children}
            </main>
          </div>
        </CustomErrorBoundary>
      </div>
    </SidebarContextProvider>
  );
}
