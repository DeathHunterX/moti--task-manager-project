"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CopyIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ResponsiveModal from "@/components/shared/ResponsiveModal";
import InviteResult from "./InviteResult";

import { useWorkspaceId } from "@/hooks/use-params";
import {
    useGetWorkspace,
    useResetWorkspaceInviteCode,
} from "@/hooks/actions/useWorkspaces";
import { useConfirm } from "@/hooks/use-confirm";

const InviteMemberModal = () => {
    const workspaceId = useWorkspaceId();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isSearchMember, setIsSearchMember] = useState(false);
    const [fullInviteLink, setFullInviteLink] = useState("");

    const [ResetDialog, confirmReset] = useConfirm(
        "Reset Invite Link",
        "This will invalidate the current invite link",
        "destructive"
    );

    const { data } = useGetWorkspace(workspaceId as string, {
        enabled: !!workspaceId,
    });

    const {
        mutate: resetWorkspaceInviteCode,
        isPending: isResetingWorkspaceInviteCode,
    } = useResetWorkspaceInviteCode();

    useEffect(() => {
        if (data?._id && data?.inviteCode) {
            setFullInviteLink(
                `${window.location.origin}/workspaces/${data._id}/join/${data.inviteCode}`
            );
        }
    }, [data]);

    const handleResetInviteCode = async () => {
        const ok = await confirmReset();
        if (!ok) return;

        resetWorkspaceInviteCode({ workspaceId: data?._id as string });
    };

    const handleCopyInviteLink = () => {
        navigator.clipboard
            .writeText(fullInviteLink)
            .then(() => toast.success("Invite link copied to clipboard."));
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1500);

        return () => clearTimeout(delay);
    }, [search]);

    const handleInputChange = (value: string) => {
        setSearch(value);
        setIsSearchMember(value !== "");
    };

    return (
        <div>
            <Button
                size="default"
                variant="teritary"
                onClick={() => setIsModalOpen((prev) => !prev)}
            >
                Invite member
            </Button>

            <ResponsiveModal
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen((prev) => !prev)}
                title="Add New Members"
                description="Invite teammates by searching for their name or email, or create an invite link anyone can use to join your workspace."
            >
                <div className="flex flex-col gap-y-6 pb-2">
                    <ResetDialog />

                    {/* Search & Invite Result */}
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Invite member by email..."
                            value={search}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={() =>
                                !isSearchMember && setIsSearchMember(true)
                            }
                        />
                        {isSearchMember && (
                            <InviteResult
                                search={debouncedSearch}
                                onClose={() => setIsSearchMember(false)}
                            />
                        )}
                    </div>

                    {/* Invite Link Section */}
                    <div className="relative">
                        <Separator className="my-2" />
                        <div className="absolute -top-3.5 left-2 bg-white p-2">
                            <span className="text-xs text-gray-500">
                                Don't see them? Send them the link!
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-x-2">
                            <Input disabled value={fullInviteLink} />
                            <Button
                                onClick={handleCopyInviteLink}
                                variant="secondary"
                                size="sm"
                            >
                                <CopyIcon />
                            </Button>
                            <Button
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
            </ResponsiveModal>
        </div>
    );
};

export default InviteMemberModal;
