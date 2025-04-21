"use client";
import React, { useCallback, useState, useEffect } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "@hello-pangea/dnd";
import { TaskStatusEnum } from "@/lib/validation/serverAction";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";

const boards: TaskStatusEnum[] = [
    TaskStatusEnum.BACKLOG,
    TaskStatusEnum.TODO,
    TaskStatusEnum.IN_PROGRESS,
    TaskStatusEnum.IN_REVIEW,
    TaskStatusEnum.DONE,
];

interface DataKanbanProps {
    data: Task[];
    onChange: (
        tasks: { _id: string; status: TaskStatusEnum; position: number }[]
    ) => void;
}

type TaskState = {
    [key in TaskStatusEnum]: Task[];
};

const DataKanban = ({ data, onChange }: DataKanbanProps) => {
    const [tasks, setTasks] = useState<TaskState>(() => {
        const initialTasks: TaskState = {
            [TaskStatusEnum.BACKLOG]: [],
            [TaskStatusEnum.TODO]: [],
            [TaskStatusEnum.IN_PROGRESS]: [],
            [TaskStatusEnum.IN_REVIEW]: [],
            [TaskStatusEnum.DONE]: [],
        };

        data.forEach((task) => {
            initialTasks[task.status].push(task);
        });

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatusEnum].sort(
                (a, b) => a.position - b.position
            );
        });

        return initialTasks;
    });

    // Handling repeat what's happening inside the statue when tasks are updated
    useEffect(() => {
        const newTasks: TaskState = {
            [TaskStatusEnum.BACKLOG]: [],
            [TaskStatusEnum.TODO]: [],
            [TaskStatusEnum.IN_PROGRESS]: [],
            [TaskStatusEnum.IN_REVIEW]: [],
            [TaskStatusEnum.DONE]: [],
        };

        data.forEach((task) => {
            newTasks[task.status].push(task);
        });

        Object.keys(newTasks).forEach((status) => {
            newTasks[status as TaskStatusEnum].sort(
                (a, b) => a.position - b.position
            );
        });

        setTasks(newTasks);
    }, [data]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;

            const { source, destination } = result;
            const sourceStatus = source.droppableId as TaskStatusEnum;
            const destStatus = destination.droppableId as TaskStatusEnum;

            let updatesPayload: {
                _id: string;
                status: TaskStatusEnum;
                position: number;
            }[] = [];

            setTasks((prevTasks) => {
                const newTasks = { ...prevTasks };

                // Safety remove  the task from the source column
                const sourceColumn = [...newTasks[sourceStatus]];
                const [movedTask] = sourceColumn.splice(source.index, 1);

                // If there's no moved task (shouldn't happen, but just in case), return the previous state
                if (!movedTask) {
                    console.error("No task found at the source index");
                    return prevTasks;
                }

                // Create a new task object with potentially updated status
                const updatedMovedTask =
                    sourceStatus !== destStatus
                        ? { ...movedTask, status: destStatus }
                        : movedTask;

                // Update the source column
                newTasks[sourceStatus] = sourceColumn;

                // Add the task to the destination column
                const destColumn = [...newTasks[destStatus]];
                destColumn.splice(destination.index, 0, updatedMovedTask);
                newTasks[destStatus] = destColumn;

                // Prepare minimal update payloads
                updatesPayload = [];

                // Always update the moved task
                updatesPayload.push({
                    _id: updatedMovedTask._id,
                    status: destStatus,
                    position: Math.min(
                        (destination.index + 1) * 1000,
                        1_000_000
                    ),
                });

                // Update positions for affected tasks in the destination column
                newTasks[destStatus].forEach((task, index) => {
                    if (task && task._id !== updatedMovedTask._id) {
                        const newPosition = Math.min(
                            (index + 1) * 1000,
                            1_000_000
                        );
                        if (task.position !== newPosition) {
                            updatesPayload.push({
                                _id: task._id,
                                status: destStatus,
                                position: newPosition,
                            });
                        }
                    }
                });

                // If the task moved between columns, update positions in the source column
                if (sourceStatus !== destStatus) {
                    newTasks[sourceStatus].forEach((task, index) => {
                        if (task) {
                            const newPosition = Math.min(
                                (index + 1) * 1000,
                                1_000_000
                            );
                            if (task.position !== newPosition) {
                                updatesPayload.push({
                                    _id: task._id,
                                    status: sourceStatus,
                                    position: newPosition,
                                });
                            }
                        }
                    });
                }

                return newTasks;
            });

            onChange(updatesPayload);
        },
        [onChange]
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {boards.map((board) => {
                    return (
                        <div
                            className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
                            key={board}
                        >
                            <KanbanColumnHeader
                                board={board}
                                taskCount={tasks[board].length}
                            />

                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="min-h-[200px] py-1.5"
                                    >
                                        {tasks[board].map((task, index) => (
                                            <Draggable
                                                key={task._id}
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className=""
                                                    >
                                                        <KanbanCard
                                                            task={task}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
};

export default DataKanban;
