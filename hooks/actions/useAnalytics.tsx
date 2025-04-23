import {
    getProjectAnalytics,
    getWorkspaceAnalytics,
} from "@/lib/actions/analytic.action";
import { RequestError } from "@/lib/http-error";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectAnalytics = (
    projectId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["project-analytics"],
        enabled: options?.enabled ?? !!projectId,
        queryFn: async () => {
            const response = await getProjectAnalytics({ projectId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid project analytics data received");
            }

            return response.data as Analytics;
        },
    });
    return query;
};

export const useGetWorkspaceAnalytics = (
    workspaceId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["workspace-analytics"],
        enabled: options?.enabled ?? !!workspaceId,
        queryFn: async () => {
            const response = await getWorkspaceAnalytics({ workspaceId });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid workspace analytics data received");
            }

            return response.data as Analytics;
        },
    });
    return query;
};
