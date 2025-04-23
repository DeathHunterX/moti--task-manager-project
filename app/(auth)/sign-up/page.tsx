import { Metadata } from "next";
import SignUpClient from "./client";

export const metadata: Metadata = {
    title: "Sign Up",
};

const SignUpPage = () => {
    return <SignUpClient />;
};

export default SignUpPage;
