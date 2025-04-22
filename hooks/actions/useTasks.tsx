import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TaskStatusEnum } from "@/lib/validation/serverAction";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    bulkUpdateTask,
    createTask,
    deleteTask,
    editTask,
    getTaskById,
    getTasks,
} from "@/lib/actions/task.action";
import { RequestError } from "@/lib/http-error";

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CreateTaskParams) => {
            const response = await createTask(data);

            if (!response.success) {
                // Throw an error if the response indicates failure
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully create a task!");

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage || "Something went wrong while creating task!",
            });
        },
    });
    return mutation;
};

export const useTaskFilters = () => {
    return useQueryStates({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(TaskStatusEnum)),
        assigneeId: parseAsString,
        search: parseAsString,
        dueDate: parseAsString,
    });
};

interface UseGetTasksParamsProp {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatusEnum | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    search?: string | null;
}

export const useGetTasks = (
    params: UseGetTasksParamsProp,
    options?: {
        enabled?: boolean;
    }
) => {
    const { workspaceId, projectId, status, assigneeId, dueDate, search } =
        params;
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            projectId,
            status,
            assigneeId,
            dueDate,
            search,
        ],
        enabled: options?.enabled ?? !!workspaceId,
        queryFn: async () => {
            const response = await getTasks({
                workspaceId,
                projectId: projectId ?? undefined,
                status: status ?? undefined,
                assigneeId: assigneeId ?? undefined,
                dueDate: dueDate ?? undefined,
                search: search ?? undefined,
            });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid workspace data received");
            }
            return response.data as unknown as Task[];
        },
    });

    return query;
};

export const useGetTaskById = (
    taskId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["tasks", { taskId }],
        enabled: options?.enabled ?? !!taskId,
        queryFn: async () => {
            const response = await getTaskById({ taskId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid data received");
            }

            return response.data as Task;
        },
    });
    return query;
};

export const useEditTask = (taskId: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: EditTaskParams) => {
            const response = await editTask(data);

            if (!response.success) {
                // Throw an error if the response indicates failure
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully edit task!");

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks", { taskId }] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
            queryClient.invalidateQueries({
                queryKey: ["workspace-analytics"],
            });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage || "Something went wrong while editing task!",
            });
        },
    });
    return mutation;
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: DeleteTaskParams) => {
            const response = await deleteTask(data);

            if (!response.success) {
                // Throw an error if the response indicates failure
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully delete workspace!");

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage || "Something went wrong while deleting task!",
            });
        },
    });
    return mutation;
};

export const useBulkUpdateTasks = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: BulkUpdateTasksParams) => {
            const response = await bulkUpdateTask(data);

            if (!response.success) {
                // Throw an error if the response indicates failure
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data;
        },
        onSuccess: () => {
            toast.success("Tasks updated!");

            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage || "Something went wrong while editing tasks!",
            });
        },
    });
    return mutation;
};
