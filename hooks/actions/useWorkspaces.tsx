import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    createWorkspace,
    deleteWorkspace,
    editWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
} from "@/lib/actions/workspace.action";
import { RequestError } from "@/lib/http-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            const response = await getAllWorkspaces({});

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

export const useGetWorkspace = (
    id: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["workspace", { id }],
        enabled: options?.enabled ?? !!id,
        queryFn: async () => {
            const response = await getWorkspaceById({ workspaceId: id });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            return response.data;
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
                    "Something went wrong while creating workspace!",
            });
        },
    });
    return mutation;
};

export const useEditWorkspace = (id: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: EditWorkspaceParams) => {
            const response = await editWorkspace(data);

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
            toast.success("Successfully edit workspace!");

            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({ queryKey: ["workspace", { id }] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while editing workspace!",
            });
        },
    });
    return mutation;
};

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: DeleteWorkspaceParams) => {
            const response = await deleteWorkspace(data);

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

            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while editing workspace!",
            });
        },
    });
    return mutation;
};
