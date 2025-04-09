import type { Metadata } from "next";
import { AppMetadata } from "./metadata";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer, Zoom } from "react-toastify";
import AuthProvider from "@/providers/AuthProvider";

const interFont = Inter({
    variable: "--font-",
});

export const metadata: Metadata = AppMetadata;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AuthProvider>
                <body
                    className={`${interFont.className} antialiased max-w-[100vw] relative`}
                >
                    {children}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        transition={Zoom}
                    />
                </body>
            </AuthProvider>
        </html>
    );
}
