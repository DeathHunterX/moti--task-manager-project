import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import TaskOverview from "@/components/features/tasks/TaskOverview";
import TaskDescription from "@/components/features/tasks/TaskDescription";

interface TaskSheetProps {
    data: Task;
    children: React.ReactNode;
}

const TaskSheet = ({ data, children }: TaskSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="h-full gap-0">
                <SheetHeader>
                    <SheetTitle>
                        {data.project?.name} &gt; {data.name}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-4 gap-y-10 col-span-1">
                    <TaskOverview data={data} />
                    <TaskDescription data={data} />
                </div>

                <SheetFooter>
                    <Button variant="destructive" size="sm" className="w-full">
                        Delete Task
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default TaskSheet;
