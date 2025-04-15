import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import FormContainer from "./FormContainer";
import { useFormModal } from "@/hooks/use-form-modal";
import { useIsMobile } from "@/hooks/use-mobile";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

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
};

const FormModal = () => {
    const { isOpen, onClose, formType, actionType, id } = useFormModal();

    const { title, description } = titleDescriptionMap[formType]?.[
        actionType
    ] || {
        title: "",
        description: "",
    };

    const isMobile = useIsMobile(1024);

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={onClose}>
                <DrawerContent className="px-8">
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <FormContainer onCancel={onClose} />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="lg:min-w-[40vw] lg:max-w-md">
                <DialogHeader className="pb-2">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <FormContainer onCancel={onClose} actionType={actionType} />
            </DialogContent>
        </Dialog>
    );
};

export default FormModal;
