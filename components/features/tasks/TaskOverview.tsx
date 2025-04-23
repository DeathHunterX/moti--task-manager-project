import TaskDate from "@/components/features/tasks/table/TaskDate";
import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import OverviewProperty from "@/components/shared/OverviewProperty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFormModal } from "@/hooks/use-form-modal";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatusEnum } from "@/lib/validation/serverAction";
import { PencilIcon } from "lucide-react";
import React from "react";

interface TaskOverviewProps {
    data: Task;
}

const TaskOverview = ({ data }: TaskOverviewProps) => {
    const { onOpen, setFormType, setActionType } = useFormModal();

    const handleOpenEditTask = () => {
        setFormType("task");
        setActionType("update");
        onOpen(data._id);
    };
    return (
        <div className="rounded-lg">
            <div className="flex items-center justify-between">
                <p className="text-base font-semibold">Overview</p>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleOpenEditTask}
                >
                    <PencilIcon className="size-4 mr-1" />
                    Edit
                </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-y-4">
                <OverviewProperty label="Assignee">
                    <MemberAvatar
                        name={data?.assignee?.name || ""}
                        className="size-6"
                    />
                    <p className="text-sm font-medium">
                        {data?.assignee?.name}
                    </p>
                </OverviewProperty>
                <OverviewProperty label="Due Date">
                    <TaskDate
                        value={new Date(data?.dueDate).toISOString()}
                        className="text-sm font-medium"
                    />
                </OverviewProperty>
                <OverviewProperty label="Status">
                    <Badge variant={data?.status as TaskStatusEnum}>
                        {snakeCaseToTitleCase(data?.status)}
                    </Badge>
                </OverviewProperty>
            </div>
        </div>
    );
};

export default TaskOverview;
