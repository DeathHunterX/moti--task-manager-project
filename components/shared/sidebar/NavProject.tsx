"use client";

import {
    CirclePlus,
    Folder,
    Forward,
    Loader,
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
import { useFormModal } from "@/hooks/use-form-modal";
import { useGetProjects } from "@/hooks/actions/useProjects";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export function NavProject() {
    const { isMobile } = useSidebar();
    const { setFormType, setActionType, onOpen } = useFormModal();

    const { workspaceId } = useParams();
    const { data, isPending } = useGetProjects(workspaceId as string);

    const handleOpenProjectForm = () => {
        setFormType("project");
        setActionType("create");
        onOpen();
    };

    if (isPending) {
        return (
            <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                <div className="flex flex-row justify-between pb-2">
                    <small className=" text-gray-500 px-2">Projects</small>
                    <span
                        className="text-xs text-gray-500 px-2"
                        onClick={handleOpenProjectForm}
                    >
                        <CirclePlus size={14} />
                    </span>
                </div>
                <SidebarMenu>
                    <Loader className="animate-spin" />
                </SidebarMenu>
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <div className="flex flex-row justify-between pb-2">
                <small className=" text-gray-500 px-2">Projects</small>
                <span
                    className="text-xs text-gray-500 px-2"
                    onClick={handleOpenProjectForm}
                >
                    <CirclePlus size={14} />
                </span>
            </div>
            <SidebarMenu>
                {(data || []).map((item) => (
                    <SidebarMenuItem key={item._id} className="my-0.5">
                        <SidebarMenuButton asChild>
                            <Link
                                href={`/workspaces/${workspaceId}/projects/${item._id}`}
                            >
                                <div className="flex items-center justify-center rounded-sm border">
                                    {(item.image as string).trim() !== "" ? (
                                        <div className="size-6 relative shrink-0">
                                            <Image
                                                src={
                                                    typeof item.image ===
                                                    "string"
                                                        ? item.image
                                                        : URL.createObjectURL(
                                                              item.image
                                                          )
                                                }
                                                fill
                                                alt={`${item.name} image`}
                                                className="rounded-sm"
                                            />
                                        </div>
                                    ) : (
                                        <div className="size-6 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-sm" />
                                    )}
                                </div>
                                {item.name}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
