export const publicRoutes: Array<string> = ["/"];

export const authRoutes: Array<string> = ["/sign-in", "sign-up"];

export const privateRoutes: Array<string> = ["/dashboard", "/completed/:path*"];

export const AUTH_ROUTES_DICT = authRoutes.reduce((acc, route) => {
    // Convert to uppercase identifier (e.g. "/sign-in" → "SIGN_IN")
    const key = route
        .replace(/^\//, "") // remove leading slash
        .replace(/-/g, "_") // replace dashes with underscores
        .toUpperCase();
    acc[key] = route.startsWith("/") ? route : `/${route}`;
    return acc;
}, {} as Record<string, string>);

export const PUBLIC_ROUTES_DICT = authRoutes.reduce((acc, route) => {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

    // Handle "/" specifically
    const key =
        normalizedRoute === "/"
            ? "ROOT"
            : normalizedRoute
                  .replace(/^\//, "")
                  .replace(/-/g, "_")
                  .toUpperCase();

    acc[key] = normalizedRoute;
    return acc;
}, {} as Record<string, string>);

export const PRIVATE_ROUTES_DICT = authRoutes.reduce((acc, route) => {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

    // Handle "/" specifically
    const key =
        normalizedRoute === "/"
            ? "ROOT"
            : normalizedRoute
                  .replace(/^\//, "")
                  .replace(/-/g, "_")
                  .toUpperCase();

    acc[key] = normalizedRoute;
    return acc;
}, {} as Record<string, string>);

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
