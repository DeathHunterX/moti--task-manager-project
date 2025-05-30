import FormContainer from "./FormContainer";
import { useFormModal } from "@/hooks/use-form-modal";
import ResponsiveModal from "../../ResponsiveModal";

const titleDescriptionMap = {
    workspace: {
        create: {
            title: "New Workspace",
            description: "Add your workspace here.",
        },
        update: {
            title: "Edit Workspace",
            description:
                "Make changes to your workspace. Click save when you're done.",
        },
    },
    project: {
        create: {
            title: "New Project",
            description: "Add your project here.",
        },
        update: {
            title: "Edit Project",
            description:
                "Make changes to your project. Click save when you're done.",
        },
    },
    task: {
        create: {
            title: "New Task",
            description: "Add your task here.",
        },
        update: {
            title: "Edit Task",
            description:
                "Make changes to your task. Click save when you're done.",
        },
    },
};

const FormModal = () => {
    const { isOpen, onClose, formType, actionType, id } = useFormModal();

    const { title, description } = titleDescriptionMap[formType]?.[
        actionType
    ] || {
        title: "",
        description: "",
    };

    return (
        <ResponsiveModal
            open={isOpen}
            onOpenChange={onClose}
            title={title}
            description={description}
        >
            <div className="pb-2">
                <FormContainer
                    formType={formType}
                    onCancel={onClose}
                    actionType={actionType}
                    id={id || ""}
                />
            </div>
        </ResponsiveModal>
    );
};

export default FormModal;
