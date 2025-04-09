// This file is used to export the NextAuth handlers and functions.
// Due to Edge runtime compatibility, the actual configuration is separated into `auth.config.ts`.
// This ensures that the Edge runtime does not load Node.js-specific modules like MongoDB directly.

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/mongodb/mongodb";

import authConfig from "./auth.config";
import type { JWT } from "next-auth/jwt";

import { getUserById } from "./lib/actions/user.action";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(client),
    session: { strategy: "jwt" as const },
    ...authConfig,
    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider !== "credentials") return true;
            if (!account || !user) return false;

            const existingUser = await getUserById(user.id as string);

            // TODO: Add case if user account isn't verfied, return false
            if (!existingUser) {
                return false;
            }

            return true;
        },

        async session({ session, token, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub as string;
            }

            return session;
        },

        async jwt({ token, account }: { token: JWT; account: any }) {
            if (token.sub) {
                const existingUser = await getUserById(token.sub as string);

                if (!existingUser) {
                    console.error("User not found in the database");
                    return token;
                }
            }

            return token;
        },
    },
});
