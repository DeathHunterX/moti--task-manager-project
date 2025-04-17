import { LoaderIcon } from "lucide-react";

interface PageLoaderProps {
    className?: string;
}

const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-12vh-54px)]">
            <LoaderIcon
                className={`size-6 animate-spin text-muted-foreground ${className}`}
            />
        </div>
    );
};

export default PageLoader;
