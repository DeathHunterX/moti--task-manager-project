import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import { useAddWorkspaceMember } from "@/hooks/actions/useMembers";
import { useGetAllUserInfo } from "@/hooks/actions/useUsers";
import { useWorkspaceId } from "@/hooks/use-params";
import { Loader } from "lucide-react";
import React from "react";

interface InviteResultProps {
    search: string;
}

const InviteResult = ({ search }: InviteResultProps) => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetAllUserInfo(search);

    const { mutate } = useAddWorkspaceMember(workspaceId);
    const handleAddWorkspaceMember = (memberId: string) => {
        mutate({
            workspaceId,
            memberId,
        });
    };

    return (
        <div className="absolute bg-white z-10 w-full border rounded-md">
            <div className="">
                {isLoading && (
                    <div className="p-4 flex flex-row justify-center">
                        <Loader className="animate-spin" size={12} />
                    </div>
                )}
                {data?.map((user) => (
                    <div
                        className="flex flex-row gap-x-2 items-center hover:bg-gray-100 p-4"
                        key={user._id}
                        onClick={() =>
                            handleAddWorkspaceMember(user._id as string)
                        }
                    >
                        <MemberAvatar name={user?.name || ""} />
                        <span>{user?.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InviteResult;
