import AppSidebar from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider className="min-h-0">
            <AppSidebar />
            <div className="">
                <SidebarTrigger />
                {children}
            </div>
        </SidebarProvider>
    );
};

export default WorkspaceLayout;
