import { ExternalLink, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useConfirm } from "@/hooks/use-confirm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useWorkspaceId } from "@/hooks/use-params";
import { useDeleteTask } from "@/hooks/actions/useTasks";
import { useFormModal } from "@/hooks/use-form-modal";

interface DataActionsProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
}

const DataActions = ({ id, projectId, children }: DataActionsProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { onOpen, setFormType, setActionType } = useFormModal();

    const { mutate: deleteTaskMutate, isPending } = useDeleteTask();

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Task",
        "This action cannot be undone.",
        "destructive"
    );

    const handleOpenEditProjectForm = () => {
        setFormType("task");
        setActionType("update");

        onOpen(id);
    };

    const handleDeleteTask = async () => {
        const ok = await confirm();
        if (!ok) return;
        deleteTaskMutate({ taskId: id, workspaceId });
    };

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    };

    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLink className="size-4 mr-2 stroke-2" />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className="font-medium p-[10px]"
                    >
                        <ExternalLink className="size-4 mr-2 stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            handleOpenEditProjectForm();
                        }}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="size-4 mr-2 stroke-2" />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDeleteTask}
                        disabled={isPending}
                        className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
                    >
                        <TrashIcon className="size-4 mr-2 stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DataActions;
