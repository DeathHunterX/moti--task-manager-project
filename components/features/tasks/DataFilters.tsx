import DatePicker from "@/components/shared/DatePicker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator,
} from "@/components/ui/select";
import { statusOptions } from "@/constants";

import { useGetWorkspaceMembers } from "@/hooks/actions/useMembers";
import { useGetProjects } from "@/hooks/actions/useProjects";
import { useTaskFilters } from "@/hooks/actions/useTasks";
import { useWorkspaceId } from "@/hooks/use-params";
import { TaskStatusEnum } from "@/lib/validation/serverAction";

import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";

interface DataFiltersProps {
    hideProjectFilter?: boolean;
}

const DataFilters = ({ hideProjectFilter }: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } =
        useGetProjects(workspaceId);
    const { data: members, isLoading: isLoadingMembers } =
        useGetWorkspaceMembers(workspaceId);

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.map((project) => ({
        name: project.name,
        value: project._id,
    }));

    const memberOptions = members?.map((member) => ({
        name: member.name,
        value: member._id,
    }));

    const [{ status, assigneeId, projectId, dueDate }, setFilters] =
        useTaskFilters();

    const onStatusChange = (value: string) => {
        setFilters({
            status: value === "all" ? null : (value as TaskStatusEnum),
        });
    };

    const onAssigneeChange = (value: string) => {
        setFilters({
            assigneeId: value === "all" ? null : (value as string),
        });
    };

    const onProjectChange = (value: string) => {
        setFilters({
            projectId: value === "all" ? null : (value as string),
        });
    };

    if (isLoading) return null;

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <Select
                defaultValue={status ?? undefined}
                onValueChange={(value) => onStatusChange(value)}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    {statusOptions.map((status) => (
                        <SelectItem value={status.value} key={status.value}>
                            {status.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                defaultValue={assigneeId ?? undefined}
                onValueChange={(value) => {
                    onAssigneeChange(value);
                }}
            >
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2" />
                        <SelectValue placeholder="All assignees" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator />
                    {memberOptions?.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                            {member.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {!hideProjectFilter && (
                <Select
                    defaultValue={projectId ?? undefined}
                    onValueChange={(value) => {
                        onProjectChange(value);
                    }}
                >
                    <SelectTrigger className="w-full lg:w-auto h-8">
                        <div className="flex items-center pr-2">
                            <FolderIcon className="size-4 mr-2" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projectOptions?.map((project) => (
                            <SelectItem
                                key={project.value}
                                value={project.value}
                            >
                                {project.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <DatePicker
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) => {
                    setFilters({ dueDate: date ? date.toISOString() : null });
                }}
            />
        </div>
    );
};

export default DataFilters;
