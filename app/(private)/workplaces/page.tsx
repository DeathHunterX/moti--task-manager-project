import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const WorkspacesPage = () => {
    return (
        <div className="mt-6 ">
            <div className="flex flex-row justify-between">
                <h1 className="mb-1.5 text-2xl text-[#172B4D]">Your work</h1>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Create Project
                </Button>
            </div>
        </div>
    );
};

export default WorkspacesPage;
