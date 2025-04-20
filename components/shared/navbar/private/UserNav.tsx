"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    // DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AUTH_ROUTES_DICT } from "@/constants/routes";
import { ChevronRight, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserNav = () => {
    const { data: session } = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative size-8 rounded-full cursor-pointer"
                >
                    <Avatar className="size-8">
                        <AvatarImage
                            src={session?.user?.image ?? ""}
                            alt={session?.user?.name ?? ""}
                        />
                        <AvatarFallback>
                            {session?.user?.name?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="size-8 rounded-lg">
                            <AvatarImage
                                src={session?.user?.image || ""}
                                alt={session?.user?.name || ""}
                            />
                            <AvatarFallback className="rounded-lg">
                                {session?.user?.name
                                    ?.slice(0, 2)
                                    ?.toUpperCase() || "CN"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {session?.user?.name || ""}
                            </span>
                            <span className="truncate text-xs">
                                {" "}
                                {session?.user?.email || ""}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuLabel>Moti</DropdownMenuLabel>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Personal Settings</DropdownMenuItem>
                    <DropdownMenuItem>Notification</DropdownMenuItem>
                    <DropdownMenuItem>
                        Theme
                        <ChevronRight />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Shortcut</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => {
                        signOut({ redirectTo: AUTH_ROUTES_DICT.SIGN_IN });
                    }}
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNav;
