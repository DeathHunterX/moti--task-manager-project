import WorkspaceForm from "@/components/shared/form/dialog/workspace/WorkspaceForm";
import React from "react";

const WorkspaceSettingsPage = () => {
    return (
        <div className="px-4 w-full ">
            <div className="flex flex-row justify-between">
                <h1 className="ms-10 mb-1.5 text-2xl text-[#172B4D]">
                    Settings
                </h1>
            </div>
            <div className="flex flex-row justify-center">
                <div className="shadow-xl px-8 py-5 rounded-md">
                    <WorkspaceForm />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSettingsPage;
