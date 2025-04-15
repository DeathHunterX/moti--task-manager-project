import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    createWorkspace,
    getAllWorkspace,
} from "@/lib/actions/workspace.action";
import { RequestError } from "@/lib/http-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            const response = await getAllWorkspace({});

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            return Array.isArray(response.data?.workspaces)
                ? response.data?.workspaces
                : response.data?.workspaces
                ? [response.data?.workspaces]
                : [];
        },
    });
    return query;
};

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: CreateWorkspaceParams) => {
            const response = await createWorkspace(data);

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
            toast.success("Successfully create a workspace!");

            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while creating category!",
            });
        },
    });
    return mutation;
};
