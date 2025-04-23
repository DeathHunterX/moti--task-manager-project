import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";
import TaskSheet from "@/components/shared/sheet/TaskSheet";
import { useWorkspaceId } from "@/hooks/use-params";
import { cn } from "@/lib/utils";
import { TaskStatusEnum } from "@/lib/validation/serverAction";
import { useRouter } from "next/navigation";
import React from "react";

interface EventCardProps {
    id: string;
    title: string;
    assignee: Member;
    project: Project;
    status: TaskStatusEnum;
}

const statusColorMap: Record<TaskStatusEnum, string> = {
    [TaskStatusEnum.BACKLOG]: "border-l-pink-400",
    [TaskStatusEnum.TODO]: "border-l-red-400",
    [TaskStatusEnum.IN_PROGRESS]: "border-l-yellow-400",
    [TaskStatusEnum.IN_REVIEW]: "border-l-blue-400",
    [TaskStatusEnum.DONE]: "border-l-emerald-400",
};

const EventCard = ({
    id,
    title,
    assignee,
    project,
    status,
}: EventCardProps) => {
    return (
        <div className="px-2">
            <TaskSheet id={id}>
                <div
                    className={cn(
                        "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
                        statusColorMap[status]
                    )}
                >
                    <p>{title}</p>
                    <div className="flex items-center gap-x-1">
                        <MemberAvatar name={assignee?.name} />
                        <div className="size-1 rounded-full bg-neutral-300" />
                        <ProjectAvatar
                            name={project?.name}
                            image={project?.image}
                        />
                    </div>
                </div>
            </TaskSheet>
        </div>
    );
};

export default EventCard;
