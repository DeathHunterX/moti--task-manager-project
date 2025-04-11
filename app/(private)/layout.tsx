import React, { ReactNode } from "react";
import PrivateNavBar from "@/components/shared/navbar/private/PrivateNavBar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="">
            <PrivateNavBar />
            <div className="px-10">{children}</div>
        </div>
    );
};

export default PrivateLayout;
