import AppSidebar from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className="min-h-0">
            <AppSidebar />
            <div className="relative mt-2 w-full">
                <SidebarTrigger className="absolute top-1 left-3" />
                {children}
            </div>
        </SidebarProvider>
    );
};

export default WorkspaceLayout;
