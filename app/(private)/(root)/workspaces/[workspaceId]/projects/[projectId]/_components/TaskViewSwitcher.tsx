"use client";
import { Fragment } from "react";
import { Loader, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useProjectId, useWorkspaceId } from "@/hooks/use-params";
import { useGetTasks, useTaskFilters } from "@/hooks/actions/useTask";
import { useFormModal } from "@/hooks/use-form-modal";

import { useQueryState } from "nuqs";
import DataFilters from "./DataFilters";
import { columns } from "./table/Columns";
import { DataTable } from "./table/DataTable";
import DataKanban from "./DataKanban";

const TaskViewSwitcher = () => {
    const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    });
    const { onOpen, setFormType, setActionType } = useFormModal();

    const workspaceId = useWorkspaceId();
    const paramProjectId = useProjectId();

    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(
        {
            workspaceId: workspaceId,
            projectId: projectId,
            assigneeId,
            status,
            dueDate,
        },
        {
            enabled: !!workspaceId,
        }
    );
    const handleOpenCreateTask = () => {
        setFormType("task");
        setActionType("create");
        onOpen();
    };

    return (
        <Tabs
            className="flex-1 w-full border rounded-lg"
            defaultValue={view}
            onValueChange={setView}
        >
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
                    <TabsList
                        className="w-full lg:w-auto bg-transparent gap-x-2"
                        defaultValue="table"
                    >
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        size="sm"
                        className="w-full lg:w-auto"
                        onClick={handleOpenCreateTask}
                    >
                        <PlusIcon className="size-4 mr-2" /> New
                    </Button>
                </div>
                <Separator className="my-4" />
                {/* Filter */}
                <DataFilters hideProjectFilter={false} />

                <Separator className="my-4" />
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <Fragment>
                        <TabsContent value="table">
                            <DataTable columns={columns} data={tasks ?? []} />
                        </TabsContent>

                        <TabsContent value="kanban">
                            <DataKanban data={tasks ?? []} />
                        </TabsContent>

                        <TabsContent value="calendar">
                            {JSON.stringify(tasks)}
                        </TabsContent>
                    </Fragment>
                )}
            </div>
        </Tabs>
    );
};

export default TaskViewSwitcher;
