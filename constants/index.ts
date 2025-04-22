import {
    AppWindow,
    CircleCheckBig,
    SettingsIcon,
    UsersIcon,
} from "lucide-react";

export const publicNavBarMap = [
    {
        title: "Feature",
        isActive: true,
        url: "#",
        items: [
            {
                title: "Task Management",
                url: "#",
                isActive: true,
            },
            {
                title: "Team Collaboration",
                url: "#",
                isActive: true,
            },
            {
                title: "Reports & Analytics",
                url: "#",
                isActive: true,
            },
            {
                title: "Automation Tools",
                url: "#",
                isActive: true,
            },
            {
                title: "Mobile Access",
                url: "#",
                isActive: true,
            },
        ],
    },

    {
        title: "Solution",
        isActive: true,
        url: "#",
        items: [
            {
                title: "For Marketing Teams",
                url: "#",
                isActive: true,
            },
            {
                title: "For Development Teams",
                url: "#",
                isActive: true,
            },
            {
                title: "For Project Managers",
                url: "#",
                isActive: true,
            },
            {
                title: "For Remote Teams",
                url: "#",
                isActive: true,
            },
            {
                title: "For Enterprise",
                url: "#",
                isActive: true,
            },
        ],
    },

    {
        title: "Pricing",
        isActive: true,
        url: "/pricing",
        items: [],
    },

    {
        title: "Customer",
        isActive: true,
        url: "#",
        items: [],
    },

    {
        title: "Resource",
        isActive: true,
        url: "#",
        items: [],
    },
];

export const privateSidebarMap = [
    {
        title: "Summary",
        url: "/",
        icon: AppWindow,
    },
    {
        title: "My Tasks",
        url: "/tasks",
        icon: CircleCheckBig,
    },
    {
        title: "Team",
        url: "/team",
        icon: UsersIcon,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
    },
];

export const MemberRoleDict = {
    ADMIN: "ADMIN",
    MEMBER: "MEMBER",
};

export const statusEnum = [
    "BACKLOG",
    "TODO",
    "IN_PROGRESS",
    "IN_REVIEW",
    "DONE",
];

export const statusOptions = statusEnum.map((status) => ({
    name: status
        .replace(/_/g, " ") // Replace underscores with spaces
        .toLowerCase() // Convert to lowercase
        .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Capitalize first letter of each word
    value: status,
}));
