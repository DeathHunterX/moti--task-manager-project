import { getAllUserInfo } from "@/lib/actions/user.action";
import { RequestError } from "@/lib/http-error";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUserInfo = (
    search: string,
    options?: {
        enabled?: boolean;
    }
) => {
    const query = useQuery({
        queryKey: ["users", search],
        enabled: options?.enabled ?? !!search,
        queryFn: async () => {
            const response = await getAllUserInfo({
                search: search ?? undefined,
            });

            if (!response.success) {
                const status = response?.status ?? 500;

                throw new RequestError(status, `HTTP error: ${status}`);
            }

            if (!response.data) {
                throw new Error("Invalid user data received");
            }
            return response.data as User[];
        },
    });

    return query;
};
