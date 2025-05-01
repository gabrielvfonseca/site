import { cookies } from "next/headers";

import { SidebarProvider, SidebarInset } from "@repo/design-system/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
 
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={true}
    >
      <AppSidebar 
        side="left"
        variant="sidebar"
        collapsible="icon"
      />
      <SidebarInset className="mx-auto flex flex-col flex-1 bg-background-100 w-full max-w-2xl gap-12 px-8 py-12 pb-10 md:px-10 lg:px-0">
        <Header />
        <div className="flex flex-col flex-1 gap-y-6">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
