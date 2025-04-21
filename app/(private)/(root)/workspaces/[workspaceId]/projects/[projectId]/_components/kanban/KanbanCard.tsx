import React from "react";
import DataActions from "../table/DataAction";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import TaskDate from "../table/TaskDate";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";

interface KanbanCardProps {
    task: Task;
}

const KanbanCard = ({ task }: KanbanCardProps) => {
    return (
        <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-x-2">
                <p className="text-sm line-clamp-2">{task.name}</p>
                <DataActions id={task._id} projectId={task.projectId}>
                    <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
                </DataActions>
            </div>

            <Separator />

            <div className="flex items-center gap-x-1.5">
                <MemberAvatar
                    name={task.assignee.name}
                    fallbackClassName="text-[10px]"
                />
                <div className="size-1 rounded-full bg-neutral-300" />
                <TaskDate
                    value={new Date(task.dueDate).toISOString()}
                    className="text-xs"
                />
            </div>
            <div className="flex items-center gap-x-1.5">
                <ProjectAvatar
                    name={task.project?.name as string}
                    image={task.project?.image}
                    fallbackClassName="text-[10px]"
                />
                <span className="text-xs font-medium">
                    {task.project?.name}
                </span>
            </div>
        </div>
    );
};

export default KanbanCard;
