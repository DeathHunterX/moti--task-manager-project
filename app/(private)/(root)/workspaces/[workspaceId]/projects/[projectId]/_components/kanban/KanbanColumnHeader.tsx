import {
    CircleCheckIcon,
    CircleDashedIcon,
    CircleDotDashedIcon,
    CircleDotIcon,
    CircleIcon,
    PlusIcon,
} from "lucide-react";

import { snakeCaseToTitleCase } from "@/lib/utils";
import { TaskStatusEnum } from "@/lib/validation/serverAction";
import { Button } from "@/components/ui/button";
import { useFormModal } from "@/hooks/use-form-modal";

interface KanbanColumnHeaderProps {
    board: TaskStatusEnum;
    taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
    [TaskStatusEnum.BACKLOG]: (
        <CircleDashedIcon className="size-[18px] text-pink-400" />
    ),
    [TaskStatusEnum.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
    [TaskStatusEnum.IN_PROGRESS]: (
        <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
    ),
    [TaskStatusEnum.IN_REVIEW]: (
        <CircleDotIcon className="size-[18px] text-blue-400" />
    ),
    [TaskStatusEnum.DONE]: (
        <CircleCheckIcon className="size-[18px] text-emerald-400" />
    ),
};

const KanbanColumnHeader = ({ board, taskCount }: KanbanColumnHeaderProps) => {
    const icon = statusIconMap[board];

    const { onOpen, setFormType, setActionType } = useFormModal();

    const handleOpenCreateTask = () => {
        setFormType("task");
        setActionType("create");
        onOpen();
    };

    return (
        <div className="px-2 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2 className="text-sm font-medium">
                    {snakeCaseToTitleCase(board)}
                </h2>
                <div className="size-5 flex items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-700 font-medium">
                    {taskCount}
                </div>
            </div>
            <Button
                onClick={handleOpenCreateTask}
                variant="ghost"
                size="icon"
                className="size-5 cursor-pointer"
            >
                <PlusIcon className="size-4 text-neutral-500" />
            </Button>
        </div>
    );
};

export default KanbanColumnHeader;
