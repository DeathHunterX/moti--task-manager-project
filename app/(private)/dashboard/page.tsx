"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardPage = () => {
    const { data: session } = useSession();

    if (!session?.user) return null;
    return (
        <div className="">
            <div className="">{JSON.stringify(session)}</div>
            <div className="">
                <Button onClick={() => signOut({ redirectTo: "/" })}>
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default DashboardPage;
