interface Workspace {
    _id: string;
    name: string;
    image: File | string;
    userId: string;
    inviteCode: string;
}

interface Member {
    _id: string;
    workspaceId: string;
    userId: string;
    name: string;
    image: File | string;
    role: "ADMIN" | "MEMBER";
}

interface Project {
    _id: string;
    name: string;
    image: File | string;
    workspaceId: string;
}

interface PaginatedSearchParams {
    page?: number;
    pageSize?: number;
    query?: string;
    filter?: string;
    sort?: string;
}

interface SearchParams {
    searchParams: Promise<{ [key: string]: string }>;
}
