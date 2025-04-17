import { Metadata } from "next";
import WorkspaceSettingsClient from "./client";

export const metadata: Metadata = {
    title: "Settings",
};

const WorkspaceSettingsPage = async () => {
    return <WorkspaceSettingsClient />;
};

export default WorkspaceSettingsPage;
