"use client";
import { JSX } from "react";
import WorkspaceForm from "./workspace/WorkspaceForm";
import ProjectForm from "./project/ProjectForm";
import TaskForm from "./task/TaskForm";

import { ModalFormType } from "@/hooks/use-form-modal";
import { useGetProjectById } from "@/hooks/actions/useProjects";
import { useGetTaskById } from "@/hooks/actions/useTasks";

interface FormContainerProps {
    formType: ModalFormType;
    onCancel?: () => void;
    actionType: "create" | "update";
    id: string;
}

const forms: Record<
    ModalFormType,
    (
        onCancel: () => void,
        actionType: "create" | "update",
        id: string
    ) => JSX.Element
> = {
    workspace: (onCancel, actionType) => (
        <WorkspaceForm onCancel={onCancel} actionType={actionType} />
    ),
    project: (onCancel, actionType, id) => {
        const { data: projectData } = useGetProjectById(id, { enabled: !!id });
        return (
            <ProjectForm
                onCancel={onCancel}
                actionType={actionType}
                initialData={projectData as Project}
            />
        );
    },
    task: (onCancel, actionType, id) => {
        const { data: taskData } = useGetTaskById(id, { enabled: !!id });
        return (
            <TaskForm
                onCancel={onCancel}
                actionType={actionType}
                initialData={taskData as Task}
            />
        );
    },
};

const FormContainer = ({
    formType,
    onCancel,
    actionType,
    id,
}: FormContainerProps) => {
    const Form = () => {
        const handleCancel = onCancel || (() => {});
        return actionType === "create" || actionType === "update"
            ? forms[formType](handleCancel, actionType, id)
            : "Form not found!";
    };
    return <Form />;
};

export default FormContainer;
