import React, { ReactNode } from "react";
import PrivateNavBar from "@/components/shared/navbar/private/PrivateNavBar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="">
            <PrivateNavBar />
            {children}
        </div>
    );
};

export default PrivateLayout;
