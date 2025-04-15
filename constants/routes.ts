/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: Array<string> = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will direct logged in users to /workspaces
 * @type {string[]}
 */
export const privateRoutes: Array<string> = [
    "/your-work",
    "/workspaces",
    "/workspaces/:workspaceId*",
];

/**
 * An array of routes used for authentication
 * These routes are related to sign-in and sign-up functionality
 * @type {string[]}
 */
export const authRoutes: Array<string> = ["/sign-in", "/sign-up"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/workspaces";

/**
 * A dictionary of authentication routes
 * Converts route paths to uppercase keys for easier access
 * Example: "/sign-in" → "SIGN_IN"
 * @type {Record<string, string>}
 */
export const AUTH_ROUTES_DICT = authRoutes.reduce((acc, route) => {
    // Convert to uppercase identifier (e.g. "/sign-in" → "SIGN_IN")
    const key = route
        .replace(/^\//, "") // remove leading slash
        .replace(/-/g, "_") // replace dashes with underscores
        .toUpperCase();
    acc[key] = route.startsWith("/") ? route : `/${route}`;
    return acc;
}, {} as Record<string, string>);

/**
 * A dictionary of public routes
 * Converts route paths to uppercase keys for easier access
 * Example: "/" → "ROOT"
 * @type {Record<string, string>}
 */
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

/**
 * A dictionary of private routes
 * Converts route paths to uppercase keys for easier access
 * Example: "/workspaces" → "WORKSPACES"
 * @type {Record<string, string>}
 */
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
