import React, { ReactNode } from "react";
import PrivateNavBar from "@/components/shared/navbar/private/PrivateNavBar";
import ModalProvider from "@/providers/ModalProvider";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ModalProvider>
            <PrivateNavBar />
            {children}
        </ModalProvider>
    );
};

export default PrivateLayout;
