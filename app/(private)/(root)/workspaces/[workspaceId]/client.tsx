"use client";

import Analytics from "@/components/shared/analytics/Analytics";
import { MemberAvatar } from "@/components/shared/avatar/MemberAvatar";
import ProjectAvatar from "@/components/shared/avatar/ProjectAvatar";
import PageError from "@/components/shared/PageError";
import PageLoader from "@/components/shared/PageLoader";
import TaskSheet from "@/components/shared/sheet/TaskSheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetWorkspaceAnalytics } from "@/hooks/actions/useAnalytics";
import { useGetWorkspaceMembers } from "@/hooks/actions/useMembers";
import { useGetProjects } from "@/hooks/actions/useProjects";
import { useGetTasks } from "@/hooks/actions/useTasks";
import { useFormModal } from "@/hooks/use-form-modal";
import { useWorkspaceId } from "@/hooks/use-params";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

const WorkspaceByIdClient = () => {
    const workspaceId = useWorkspaceId();

    const { data: analytics, isLoading: isLoadingAnalytics } =
        useGetWorkspaceAnalytics(workspaceId);

    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
        workspaceId,
    });
    const { data: projects, isLoading: isLoadingProjects } =
        useGetProjects(workspaceId);
    const { data: members, isLoading: isLoadingMembers } =
        useGetWorkspaceMembers(workspaceId);

    const isLoading =
        isLoadingAnalytics ||
        isLoadingTasks ||
        isLoadingProjects ||
        isLoadingMembers;

    if (isLoading) return <PageLoader />;

    if (!analytics || !tasks || !projects || !members)
        return <PageError message="Failed to load workspace data!" />;

    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TaskList data={tasks} total={tasks.length} />
                <div className="flex flex-col gap-4">
                    <ProjectList data={projects} total={projects.length} />
                    <MemberList data={members} total={members.length} />
                </div>
            </div>
        </div>
    );
};

interface TaskListProps {
    data: Task[];
    total: number;
}

export const TaskList = ({ data, total }: TaskListProps) => {
    const workspaceId = useWorkspaceId();
    const { onOpen, setFormType, setActionType } = useFormModal();

    const handleOpenCreateProject = () => {
        setActionType("create");
        setFormType("project");
        onOpen();
    };

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">Tasks ({total})</p>
                    <Button
                        variant="muted"
                        size="icon"
                        onClick={handleOpenCreateProject}
                    >
                        <PlusIcon className="size-4 text-neutral-700" />
                    </Button>
                </div>
                <Separator className="my-4" />
                <ul className="flex flex-col gap-y-4">
                    {data
                        .sort((a, b) => {
                            return (
                                new Date(b.created_at || 0).getTime() -
                                new Date(a.created_at || 0).getTime()
                            );
                        })
                        .slice(0, 6)
                        .map((task) => (
                            <li key={task._id}>
                                <TaskSheet id={task._id}>
                                    <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                        <CardContent className="p-4">
                                            <p className="text-base font-medium truncate">
                                                {task.name}
                                            </p>
                                            <div className="flex items-center gap-x-2">
                                                <p className="text-sm">
                                                    {task.project?.name}
                                                </p>
                                                <div className="size-1 rounded-full bg-neutral-300" />
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <CalendarIcon className="size-3 mr-1" />
                                                    <span className="truncate text-sm">
                                                        {formatDistanceToNow(
                                                            new Date(
                                                                task.dueDate
                                                            )
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TaskSheet>
                            </li>
                        ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No tasks found
                    </li>
                </ul>
                <Button variant="muted" className="mt-4 w-full" asChild>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        Show All
                    </Link>
                </Button>
            </div>
        </div>
    );
};

interface ProjectListProps {
    data: Project[];
    total: number;
}

export const ProjectList = ({ data, total }: ProjectListProps) => {
    const workspaceId = useWorkspaceId();
    const { onOpen, setFormType, setActionType } = useFormModal();

    const handleOpenCreateProject = () => {
        setActionType("create");
        setFormType("project");
        onOpen();
    };

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">
                        Projects ({total})
                    </p>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleOpenCreateProject}
                    >
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <Separator className="my-4" />

                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.slice(0, 4).map((project) => (
                        <li key={project._id}>
                            <Link
                                href={`/workspaces/${workspaceId}/projects/${project._id}`}
                            >
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="flex items-center gap-x-2.5 p-4">
                                        <ProjectAvatar
                                            name={project.name}
                                            image={project.image}
                                        />
                                        <p className="text-lg font-medium truncate">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface MemberListProps {
    data: Member[];
    total: number;
}

export const MemberList = ({ data, total }: MemberListProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">Members ({total})</p>
                    <Button variant="secondary" size="icon" asChild>
                        <Link href={`/workspaces/${workspaceId}/team`}>
                            <SettingsIcon className="size-4 text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <Separator className="my-4" />

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.slice(0, 4).map((member) => (
                        <li key={member._id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                                    <MemberAvatar
                                        name={member.name}
                                        className="size-12"
                                    />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-lg font-medium line-clamp-1">
                                            {member.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WorkspaceByIdClient;
