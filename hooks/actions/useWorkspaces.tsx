import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    createWorkspace,
    deleteWorkspace,
    editWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    getWorkspaceInfo,
    joinWorkspaceByInviteCode,
    resetInviteCode,
} from "@/lib/actions/workspace.action";
import { RequestError } from "@/lib/http-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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

            if (!response.data) {
                throw new Error("Invalid workspace data received");
            }
            return response.data as Workspace;
        },
    });
    return query;
};

export const useGetWorkspaceInfo = (
    id: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["workspace", { id }],
        enabled: options?.enabled ?? !!id,
        queryFn: async () => {
            const response = await getWorkspaceInfo({ workspaceId: id });

            if (!response.success) {
                const { status, error } = response;

                ErrorToastMsg({
                    title: `Error ${status ?? 500}`,
                    description:
                        error?.message ||
                        "Something went wrong while creating workspace!",
                });
            }

            if (!response.data) {
                ErrorToastMsg({
                    title: `Error ${500}`,
                    description: "Invalid workspace data received",
                });
            }

            return response.data as Workspace;
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

export const useResetWorkspaceInviteCode = () => {
    const queryClient = useQueryClient();
    const { workspaceId } = useParams();

    const mutation = useMutation({
        mutationFn: async (data: ResetInvitationCodeByWorkspaceIdParams) => {
            const response = await resetInviteCode(data);

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
            toast.success("Successfully reset workspace invitation code!");

            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({
                queryKey: ["workspace", { id: workspaceId as string }],
            });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while reset workspace invitation code!",
            });
        },
    });

    return mutation;
};

export const useJoinWorkspaceByInviteCode = () => {
    const queryClient = useQueryClient();
    const { workspaceId } = useParams();

    const mutation = useMutation<
        Workspace,
        Error,
        JoinWorkspaceByInviteCodeParams
    >({
        mutationFn: async (data: JoinWorkspaceByInviteCodeParams) => {
            const response = await joinWorkspaceByInviteCode(data);

            if (!response.success || !response.data) {
                // Throw an error if the response indicates failure or data is invalid
                const status = response?.status ?? 500;
                const message =
                    response?.error?.message || "Something went wrong";
                throw new Error(`${status}: ${message}`);
            }

            return response.data as Workspace;
        },
        onSuccess: () => {
            toast.success("Successfully join workspace!");

            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({
                queryKey: ["workspace", { id: workspaceId as string }],
            });
            queryClient.invalidateQueries({
                queryKey: [
                    "check-member",
                    { workspaceId: workspaceId as string },
                ],
            });
        },
        onError: (error: any) => {
            const [status, errorMessage] = error.message.split(":");
            ErrorToastMsg({
                title: `Error ${status}`,
                description:
                    errorMessage ||
                    "Something went wrong while use invite code to join workspace!",
            });
        },
    });

    return mutation;
};
