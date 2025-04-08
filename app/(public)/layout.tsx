import React, { ReactNode } from "react";
import NavBar from "./_components/navbar/NavBar";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
};

export default PublicLayout;
