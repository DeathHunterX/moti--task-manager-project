const author = "Loi Phan Thanh";
const description =
    "Moti is a minimalist and powerful task management app designed to help you stay focused, organized, and motivated. Plan your day, track progress, and get things done—one task at a time.";
const url = "http://localhost:3000";

export const AppMetadata = {
    metadataBase: new URL(url),
    title: {
        default: "Moti | Task Manager System",
        template: `%s | Moti`,
    },
    description,
    icons: {
        icon: "/logo-without-name.png",
    },
    keywords: ["Moti", "Task Manager System"],
    creator: author,
    authors: [{ name: author, description, url }],
    openGraph: {
        title: "Moti | Task Manager System",
        description,
        url,
        siteName: "Moti",
        locale: "en-US",
        type: "website",
    },
};
