"use client";
import WorkspaceForm from "./workspace/WorkspaceForm";
import ProjectForm from "./project/ProjectForm";
import { ModalFormType } from "@/hooks/use-form-modal";
import { JSX } from "react";

interface FormContainerProps {
    formType: ModalFormType;
    onCancel?: () => void;
    actionType: "create" | "update";
}

const forms: Record<
    ModalFormType,
    (onCancel: () => void, actionType: "create" | "update") => JSX.Element
> = {
    workspace: (onCancel, actionType) => (
        <WorkspaceForm onCancel={onCancel} actionType={actionType} />
    ),
    project: (onCancel, actionType) => (
        <ProjectForm onCancel={onCancel} actionType={actionType} />
    ),
};

const FormContainer = ({
    formType,
    onCancel,
    actionType,
}: FormContainerProps) => {
    const Form = () => {
        const handleCancel = onCancel || (() => {});
        return actionType === "create" || actionType === "update"
            ? forms[formType](handleCancel, actionType)
            : "Form not found!";
    };
    return <Form />;
};

export default FormContainer;
