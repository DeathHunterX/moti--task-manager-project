interface Workspace {
    _id: string;
    name: string;
    image: File | string;
    userId: string;
    inviteCode: string;
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
