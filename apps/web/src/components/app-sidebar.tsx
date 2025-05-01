"use client"

import * as React from "react";
import { 
  Blocks, 
  Bookmark, 
  Inbox, 
  Search, 
  MessageCircle, 
  BookMarked 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/design-system/components/ui/sidebar";

// This is sample data
const data = {
  main: [
  {
    title: "Home",
    url: "#",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "Search",
    url: "#",
      icon: Search,
      isActive: false,
    },
  ],
  menu: [
    {
      title: "Writing",
      url: "#",
      icon: BookMarked,
      isActive: true,
    },
    {
      title: "Bookmarks",
      url: "#",
      icon: Bookmark,
      isActive: true,
    },
    {
      title: "Stack",
      url: "#",
      icon: Blocks,
      isActive: true,
    },
        {
      title: "AMA",
      url: "#",
      icon: MessageCircle,
      isActive: true,
    },
  ],
  projects: [
    {
      title: "Home",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.main[0])
  const { setOpen } = useSidebar()

  return (
      <Sidebar
        collapsible="none"
        {...props}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.main.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)          
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Gabriel
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.menu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)          
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              Projects
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.projects.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)          
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
  )
}
