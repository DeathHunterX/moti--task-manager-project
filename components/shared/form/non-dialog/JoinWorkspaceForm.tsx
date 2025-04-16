"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useJoinWorkspaceByInviteCode } from "@/hooks/actions/useWorkspaces";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
    initialValues: Workspace;
}

const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const { workspaceId, inviteCode } = useParams();
    const { mutate, isPending } = useJoinWorkspaceByInviteCode();

    const onSubmit = () => {
        if (!workspaceId || !inviteCode) {
            return;
        }

        mutate(
            {
                workspaceId: String(workspaceId),
                inviteCode: String(inviteCode),
            },
            {
                onSuccess: (data: Workspace) => {
                    router.push(`/workspaces/${data._id}`);
                },
            }
        );
    };

    return (
        <Card className="size-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join{" "}
                    <strong>{initialValues.name}</strong> workspace.
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <hr />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                    <Button
                        size="lg"
                        variant="secondary"
                        type="button"
                        asChild
                        className="w-full lg:w-fit"
                        // disabled={isPending}
                    >
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button
                        size="lg"
                        type="button"
                        className="w-full lg:w-fit"
                        onClick={onSubmit}
                        // disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default JoinWorkspaceForm;
