"use client";
import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import { useAddWorkspaceMember } from "@/hooks/actions/useMembers";
import { useGetAllUserInfo } from "@/hooks/actions/useUsers";
import { useWorkspaceId } from "@/hooks/use-params";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";

interface InviteResultProps {
    search: string;
    onClose: () => void;
}

const InviteResult = ({ search, onClose }: InviteResultProps) => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetAllUserInfo(search);
    const { mutate } = useAddWorkspaceMember(workspaceId);

    const handleAddWorkspaceMember = (memberId: string) => {
        mutate({
            workspaceId,
            memberId,
        });
    };

    const ref = useRef<HTMLDivElement>(null);

    // Close the component when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose(); // Call the onClose callback
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={ref}
            className="absolute bg-white z-10 w-full border rounded-md"
        >
            {isLoading && (
                <div className="p-4 flex flex-row justify-center">
                    <Loader className="animate-spin" size={12} />
                </div>
            )}
            {data?.map((user) => (
                <div
                    className="group flex flex-row justify-between items-center hover:bg-gray-100 p-4"
                    key={user._id}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => handleAddWorkspaceMember(user._id as string)}
                >
                    <div className="flex flex-row gap-x-2">
                        <MemberAvatar
                            name={user?.name || ""}
                            className="size-7"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm">{user?.name}</span>
                            <small className="text-xs">{user?.email}</small>
                        </div>
                    </div>

                    <div className="hidden group-hover:block">
                        <small className="text-xs text-blue-500">
                            Add member
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InviteResult;
