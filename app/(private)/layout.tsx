import React, { ReactNode } from "react";
import PrivateNavBar from "@/components/shared/navbar/private/PrivateNavBar";
import ModalProvider from "@/providers/ModalProvider";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ModalProvider>
            <PrivateNavBar />
            <div className="mt-16">{children}</div>
        </ModalProvider>
    );
};

export default PrivateLayout;
