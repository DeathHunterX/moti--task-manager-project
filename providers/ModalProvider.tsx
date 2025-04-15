"use client";

import React from "react";
import FormModal from "@/components/shared/form/dialog/FormDialog";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <FormModal />
        </>
    );
};

export default ModalProvider;
