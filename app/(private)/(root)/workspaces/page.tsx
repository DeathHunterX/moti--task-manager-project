import { Metadata } from "next";
import WorkspacesClient from "./client";

export const metadata: Metadata = {
    title: "Workspaces",
};
const WorkspacesPage = async () => {
    return (
        <div className="px-10">
            <WorkspacesClient />
        </div>
    );
};

export default WorkspacesPage;
