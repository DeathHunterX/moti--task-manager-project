"use client";
import WorkspaceForm from "./workspace/WorkspaceForm";
import ProjectForm from "./project/ProjectForm";
import { ModalFormDataType, ModalFormType } from "@/hooks/use-form-modal";
import { JSX } from "react";
import TaskForm from "./task/TaskForm";

interface FormContainerProps {
    formType: ModalFormType;
    onCancel?: () => void;
    actionType: "create" | "update";
    data: ModalFormDataType;
}

const forms: Record<
    ModalFormType,
    (
        onCancel: () => void,
        actionType: "create" | "update",
        data: ModalFormDataType
    ) => JSX.Element
> = {
    workspace: (onCancel, actionType) => (
        <WorkspaceForm onCancel={onCancel} actionType={actionType} />
    ),
    project: (onCancel, actionType, data) => (
        <ProjectForm
            onCancel={onCancel}
            actionType={actionType}
            initialValue={data as Project}
        />
    ),
    task: (onCancel, actionType, data) => {
        return (
            <TaskForm
                onCancel={onCancel}
                actionType={actionType}
                data={data as Task}
            />
        );
    },
};

const FormContainer = ({
    formType,
    onCancel,
    actionType,
    data,
}: FormContainerProps) => {
    const Form = () => {
        const handleCancel = onCancel || (() => {});
        return actionType === "create" || actionType === "update"
            ? forms[formType](handleCancel, actionType, data)
            : "Form not found!";
    };
    return <Form />;
};

export default FormContainer;
