"use client";

import {
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
    type LucideIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import { useParams } from "next/navigation";
import Link from "next/link";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
    }[];
}) {
    const { state, isMobile } = useSidebar();
    const { workspaceId } = useParams();

    return (
        <SidebarGroup>
            <SidebarGroupLabel asChild>Overview</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const fullHref = `/workspaces/${workspaceId}${item.url}`;
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link href={fullHref}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
