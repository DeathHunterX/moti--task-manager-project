import React from "react";
import WorkspaceForm from "./workspace/WorkspaceForm";

interface FormContainerProps {
    onCancel?: () => void;
    actionType: "create" | "update";
}

const FormContainer = ({ onCancel, actionType }: FormContainerProps) => {
    return <WorkspaceForm onCancel={onCancel} actionType={actionType} />;
};

export default FormContainer;
