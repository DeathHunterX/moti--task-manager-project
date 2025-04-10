export const featuresSectionData = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
        ),
        title: "Task Management",
        description:
            "Create, assign and track tasks with deadlines, priorities and custom labels.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        title: "Time Tracking",
        description:
            "Monitor time spent on tasks, analyze productivity and improve your workflow.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>
        ),
        title: "Team Collaboration",
        description:
            "Work together seamlessly with real-time updates, comments and file sharing.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
            </svg>
        ),
        title: "Visual Reports",
        description:
            "Get insights with customizable dashboards and detailed performance analytics.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
            </svg>
        ),
        title: "Cloud Storage",
        description:
            "Store and access your files from anywhere with secure cloud integration.",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                />
            </svg>
        ),
        title: "Automation",
        description:
            "Set up automated workflows to reduce manual work and increase efficiency.",
    },
];

export const testimonialSectionData = [
    {
        content:
            "The intuitive interface and powerful features make Moti the perfect solution for our remote team. It's like having everyone in the same room.",
        authorImg: "/homepage/testimonial-03.jpg",
        authorName: "David Chen",
        authorPosition: "CTO, RemoteWorks",
    },
    {
        content:
            "We've tried many task management tools, but Moti is by far the most comprehensive and user-friendly solution we've found.",
        authorImg: "/homepage/testimonial-01.jpg",
        authorName: "Emily Rodriguez",
        authorPosition: "Project Lead, DesignStudio",
    },
    {
        content:
            "Moti has completely transformed how our team works. We're now 40% more productive and our project delivery is consistently on schedule.",
        authorImg: "/homepage/testimonial-02.jpg",
        authorName: "Sarah Johnson",
        authorPosition: "Product Manager, TechCorp",
    },
];

export const pricingSectionData = [
    {
        name: "Free",
        price: 0,
        billing: "per month",
        mostPopular: false,
        features: [
            "Up to 3 team members",
            "5 projects",
            "Basic task management",
            "Limited file storage (100MB)",
            "Email support",
        ],
        cta: "Get Started",
    },
    {
        name: "Pro",
        price: 12,
        billing: "/user/month",
        mostPopular: true,
        features: [
            "Unlimited team members",
            "Unlimited projects",
            "Advanced task management",
            "10GB file storage per user",
            "Time tracking",
            "Custom workflows",
            "Priority support",
        ],
        cta: "Get Started",
    },
    {
        name: "Enterprise",
        price: 12,
        billing: "/user/month",
        mostPopular: false,
        features: [
            "Everything in Pro",
            "Unlimited file storage",
            "Advanced security features",
            "Admin controls",
            "Custom integrations",
            "API access",
            "Dedicated support manager",
        ],
        cta: "Contact Sales",
    },
];
