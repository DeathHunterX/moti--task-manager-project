import { Metadata } from "next";
import SignInClient from "./client";

export const metadata: Metadata = {
    title: "Sign In",
};

const SignInPage = () => {
    return <SignInClient />;
};

export default SignInPage;
