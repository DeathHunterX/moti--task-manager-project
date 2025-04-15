"use client";
import AuthPageWrapper from "@/components/shared/wrapper/AuthPageWrapper";
import SocialAuthForm from "@/components/shared/form/non-dialog/auth/SocialAuthForm";
import AuthForm from "@/components/shared/form/non-dialog/auth/AuthForm";
import { SignUpSchema } from "@/lib/validation/auth";
import { signUpWithCredentials } from "@/lib/actions/auth/signUp.action";
import { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Sign Up",
// };

const SignUpPage = () => {
    return (
        <AuthPageWrapper
            title="Get started with Moti"
            description="Stay focused and achieve more every day."
        >
            <div className="flex flex-col items-center">
                <div className="flex size-full flex-col rounded-3xl bg-white pb-6 text-center">
                    <SocialAuthForm />

                    <div className="mt-4 flex items-center">
                        <hr className="h-0 grow border-b border-solid border-gray-200" />
                        <p className="mx-4 text-gray-400 capitalize">
                            or log in with your email
                        </p>
                        <hr className="h-0 grow border-b border-solid border-gray-200" />
                    </div>

                    <AuthForm
                        formType="SIGN_UP"
                        schema={SignUpSchema}
                        defaultValues={{ name: "", email: "", password: "" }}
                        onSubmit={signUpWithCredentials}
                    />
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default SignUpPage;
