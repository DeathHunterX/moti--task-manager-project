"use client";
import AuthPageWrapper from "@/components/shared/wrapper/AuthPageWrapper";
import SocialAuthForm from "@/components/shared/form/auth/SocialAuthForm";
import AuthForm from "@/components/shared/form/auth/AuthForm";
import { SignInSchema } from "@/lib/validation";
import { signInWithCredentials } from "@/lib/actions/auth/signIn.action";

const SignInPage = () => {
    return (
        <AuthPageWrapper
            title="Welcome Back!"
            description="Log in or Create account to get back to your dashboard!"
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
                        formType="SIGN_IN"
                        schema={SignInSchema}
                        defaultValues={{ email: "", password: "" }}
                        onSubmit={signInWithCredentials}
                    />
                </div>
            </div>
        </AuthPageWrapper>
    );
};

export default SignInPage;
