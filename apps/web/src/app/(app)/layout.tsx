import { cookies } from "next/headers";

import { SidebarProvider, SidebarInset } from "@repo/design-system/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "true";
 
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="mx-auto bg-background flex flex-col flex-1 w-full max-w-2xl px-4 py-12 pb-10 md:px-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
