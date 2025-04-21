import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

interface ProjectAvatarProps {
    image?: string;
    name: string;
    className?: string;
    fallbackClassName?: string;
}

const ProjectAvatar = ({ image = "", name, className }: ProjectAvatarProps) => {
    return (
        <div
            className={cn(
                "flex flex-row gap-x-2 items-center capitalize",
                className
            )}
        >
            <div className="flex items-center justify-center rounded-sm border">
                {image?.trim() !== "" ? (
                    <div className="size-6 relative shrink-0">
                        <Image
                            src={image || ""}
                            fill
                            alt={`${name} image`}
                            className="rounded-sm"
                        />
                    </div>
                ) : (
                    <div className="size-6 bg-gradient-to-bl from-violet-500 to-fuchsia-500 rounded-sm" />
                )}
            </div>
        </div>
    );
};

export default ProjectAvatar;
