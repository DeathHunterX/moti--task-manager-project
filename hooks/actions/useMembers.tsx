import { ErrorToastMsg } from "@/components/shared/Toast";
import {
    deleteWorkspaceMember,
    getWorkspaceMembers,
    isWorkspaceMember,
} from "@/lib/actions/member.action";
import { RequestError } from "@/lib/http-error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetWorkspaceMembers = (
    workspaceId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery<unknown, Error, Member[]>({
        queryKey: ["members", { workspaceId }],
        enabled: options?.enabled ?? !!workspaceId,
        queryFn: async () => {
            const response = await getWorkspaceMembers({ workspaceId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid member data received");
            }
            return response.data as Member[];
        },
    });
    return query;
};

export const useIsWorkspaceMember = (
    workspaceId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["check-member", { workspaceId }],
        enabled: options?.enabled ?? !!workspaceId,
        queryFn: async () => {
            const response = await isWorkspaceMember({ workspaceId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid member data received");
            }
            return response.data as Member;
        },
    });
    return query;
};

export const useRemoveWorkspaceMember = (workspaceId: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: DeleteWorkspaceMemberParams) => {
            const response = await deleteWorkspaceMember(data);

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
            toast.success("Successfully remove a member!");

            queryClient.invalidateQueries({
                queryKey: ["members", { workspaceId }],
            });
            queryClient.invalidateQueries({
                queryKey: ["workspace", { id: workspaceId }],
            });
            queryClient.invalidateQueries({
                queryKey: ["check-member", { workspaceId }],
            });
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
