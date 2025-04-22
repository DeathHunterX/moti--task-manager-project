"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ResponsiveModal from "@/components/shared/ResponsiveModal";

import InviteResult from "./InviteResult";

import { useWorkspaceId } from "@/hooks/use-params";
import {
    useGetWorkspace,
    useResetWorkspaceInviteCode,
} from "@/hooks/actions/useWorkspaces";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "react-toastify";
import { CopyIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const InviteMemberModal = () => {
    const workspaceId = useWorkspaceId();

    const [ResetDialog, confirmReset] = useConfirm(
        "Reset Invite Link",
        "This will invalidate the current invite link",
        "destructive"
    );

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");

    const [isSearchMember, setIsSearchMember] = useState<boolean>(false);

    const [fullInviteLink, setFullInviteLink] = useState<string>("");

    const { data, isPending } = useGetWorkspace(workspaceId as string, {
        enabled: !!workspaceId,
    });

    const {
        mutate: resetWorkspaceInviteCode,
        isPending: isResetingWorkspaceInviteCode,
    } = useResetWorkspaceInviteCode();

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetWorkspaceInviteCode({ workspaceId: data?._id as string });
    };

    useEffect(() => {
        if (data?._id && data?.inviteCode) {
            setFullInviteLink(
                `${window.location.origin}/workspaces/${data._id}/join/${data.inviteCode}`
            );
        }
    }, [data]);

    const handleCopyInviteLink = () => {
        navigator.clipboard
            .writeText(fullInviteLink)
            .then(() => toast.success("Invite link copied to clipboard."));
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setDebouncedSearch(search); // Update the debounced search value
        }, 3000); // 1s delay

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout
    }, [search]);

    return (
        <div className="">
            <Button
                size="default"
                variant="teritary"
                onClick={() => setIsModalOpen(!isModalOpen)}
            >
                Invite member
            </Button>
            <ResponsiveModal
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen((prevState) => !prevState)}
                title="Add New Members"
                description="Invite teammates by searching for their name or email, or create an invite link anyone can use to join your workspace."
            >
                <div className="flex flex-col gap-y-6 pb-2">
                    <ResetDialog />
                    <div className="relative w-full">
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Invite member by email..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);

                                    if (!isSearchMember)
                                        setIsSearchMember(true);

                                    if (e.target.value === "" && isSearchMember)
                                        setIsSearchMember(false);
                                }}
                                className=""
                            />
                        </div>
                        {isSearchMember && (
                            <InviteResult search={debouncedSearch} />
                        )}
                    </div>

                    <div className="relative">
                        <Separator className="my-2" />
                        <div className="bg-white p-2 absolute -top-3.5 left-2">
                            <span className="text-xs text-gray-500">
                                Don't see them? Send them the link!
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <div className="flex flex-row items-center gap-x-2">
                                <Input disabled value={fullInviteLink} />
                                <Button
                                    onClick={handleCopyInviteLink}
                                    variant="secondary"
                                    size="sm"
                                >
                                    <CopyIcon />
                                </Button>
                                <Button
                                    className="w-fit items-"
                                    size="sm"
                                    variant="destructive"
                                    type="button"
                                    disabled={isResetingWorkspaceInviteCode}
                                    onClick={handleResetInviteCode}
                                >
                                    Reset Invite Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </ResponsiveModal>
        </div>
    );
};

export default InviteMemberModal;
