import { getProjectAnalytics } from "@/lib/actions/analytic.action";
import { RequestError } from "@/lib/http-error";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectAnalytics = (
    projectId: string,
    options?: { enabled?: boolean }
) => {
    const query = useQuery({
        queryKey: ["project-analytics", { projectId }],
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

            return response.data as ProjectAnalytics;
        },
    });
    return query;
};
