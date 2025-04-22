"use client";
import PageLoader from "@/components/shared/PageLoader";
import AppSidebar from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsWorkspaceMember } from "@/hooks/actions/useMembers";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    const { workspaceId } = useParams();
    const router = useRouter();

    /** Description:
     *   - Check if workspace id is in the db
     *       + Having workspace in db
     *          ++ Check if current user is a member of current workspace
     *              +++ Current member => stay
     *                +++ Not a current member => appear small ui and redirect to workspaces page
     *       + Not having workspace in db => appear small ui with message not found and redirect to workspaces page
     *
     */
    const { data, isPending, isError } = useIsWorkspaceMember(
        workspaceId as string,
        { enabled: !!workspaceId }
    );

    const [countdown, setCountdown] = useState<number>(5);

    useEffect(() => {
        if ((isError || !data) && isPending === false) {
            const interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            // Redirect after countdown ends
            const timeout = setTimeout(() => {
                router.push("/workspaces");
            }, 5000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, [isError, data, router]);

    if (isPending) {
        return <PageLoader />;
    }

    // Show error card if the user is not a member
    if (isError || !data) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-12vh-54px)]">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">
                        You are not a member of this workspace
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Redirecting you to the workspaces page in {countdown}{" "}
                        seconds...
                    </p>
                    <p className="text-sm text-gray-500">
                        If you believe this is a mistake, please contact the
                        workspace administrator.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <SidebarProvider className="min-h-0">
            <AppSidebar />
            <div className="relative mt-2 w-full">
                <div className="px-5">{children}</div>
            </div>
        </SidebarProvider>
    );
};

export default WorkspaceLayout;
