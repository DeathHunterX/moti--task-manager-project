import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormModal } from "@/hooks/use-form-modal";
import { PlusIcon } from "lucide-react";
import { Fragment } from "react";

const TaskViewSwitcher = () => {
    const { onOpen, setFormType, setActionType } = useFormModal();

    const handleOpenCreateTask = () => {
        setFormType("task");
        setActionType("create");
        onOpen();
    };

    return (
        <Tabs className="flex-1 w-full border rounded-lg" defaultValue="table">
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
                {/* Add filter */}
                Data Filter
                <Separator className="my-4" />
                <Fragment>
                    <TabsContent value="table">Data table</TabsContent>

                    <TabsContent value="kanban">Data kanban</TabsContent>

                    <TabsContent value="calendar">Data calendar</TabsContent>
                </Fragment>
            </div>
        </Tabs>
    );
};

export default TaskViewSwitcher;
