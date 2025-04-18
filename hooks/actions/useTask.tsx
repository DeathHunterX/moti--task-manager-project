import { ErrorToastMsg } from "@/components/shared/Toast";
import { createTask } from "@/lib/actions/task.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
