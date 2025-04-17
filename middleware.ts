"use server";

import {
    publicRoutes,
    privateRoutes,
    authRoutes,
    apiAuthPrefix,
    AUTH_ROUTES_DICT,
    DEFAULT_LOGIN_REDIRECT,
} from "@/constants/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);
export default auth((req: any) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isOnSignInPage = nextUrl.pathname === AUTH_ROUTES_DICT.SIGN_IN;
    const isDefaultRedirect = nextUrl.pathname === DEFAULT_LOGIN_REDIRECT;

    /**
     * Case:
     *    - Allow API auth routes to proceed without any redirection.
     */
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    /**
     * Case:
     *    - User is logged in.
     *    - User is trying to access an auth route (like login or register).
     *    - User is NOT already on the dashboard or sign-in page.
     *    - Redirect the user to the dashboard.
     */
    if (
        isPrivateRoute &&
        isLoggedIn &&
        isAuthRoute &&
        !isDefaultRedirect &&
        !isOnSignInPage
    ) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    /**
     * Case:
     *    - User is logged in.
     *    - User is trying to access the sign-in page.
     *    - Redirect the user to the dashboard since they are already logged in.
     */
    if (isLoggedIn && isOnSignInPage && isAuthRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    /**
     * Case:
     *    - User is logged in.
     *    - User is on a public page.
     *    - Redirect the user to the private root page (e.g., dashboard).
     */
    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    /**
     * Case:
     *    - User is not logged in.
     *    - User is trying to access a non-public route.
     *    - Redirect the user to the sign-in page.
     */
    if (!isLoggedIn && !isPublicRoute && !isOnSignInPage && !isAuthRoute) {
        return NextResponse.redirect(new URL("/sign-in", nextUrl));
    }

    /**
     * Case:
     *    - Allow the request to proceed as no redirect conditions were met.
     */
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
