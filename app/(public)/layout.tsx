import React, { ReactNode } from "react";
import NavBar from "./_components/navbar/NavBar";
import Footer from "./_components/Footer";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
