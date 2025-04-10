// This file contains the NextAuth configuration.
// It is separated from `auth.ts` to avoid loading Node.js-specific modules (e.g., MongoDB adapter)
// in the Edge runtime. This configuration is imported and used in `auth.ts`.
import { type NextAuthConfig } from "next-auth";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/validation";
import { verifyUserCredentials } from "./lib/actions/auth/signUp.action";

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const isUserCredentials = await fetch(
                        `${process.env.NEXT_BASE_URL}/api/auth/verify`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email,
                                password,
                            }),
                        }
                    ).then((res) => res.json());

                    if (!isUserCredentials.success) {
                        return null;
                    }

                    return isUserCredentials.user;
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
