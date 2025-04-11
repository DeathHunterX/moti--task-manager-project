import React, { ReactNode } from "react";
import PublicNavBar from "../../components/shared/navbar/public/PublicNavBar";
import Footer from "./_components/Footer";

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <PublicNavBar />
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
