import TaskViewSwitcher from "../../../../../../components/features/tasks/TaskViewSwitcher";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tasks",
};
const TasksPage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="ms-3 text-xl text-[#172B4D]">Tasks</h1>

            <TaskViewSwitcher />
        </div>
    );
};

export default TasksPage;
