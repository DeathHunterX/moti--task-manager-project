import { create } from "zustand";

export type ModalFormType = "workspace" | "project" | "task";
export type ModalFormDataType = Workspace | Project | Task;

type FormModalState = {
    // Dialog state management
    isOpen: boolean;
    onOpen: (data?: ModalFormDataType) => void;
    onClose: () => void;

    // Form state management
    data?: ModalFormDataType;
    formType: ModalFormType;
    actionType: "create" | "update";
    setFormType: (formType: ModalFormType) => void;
    setActionType: (actionType: "create" | "update") => void;
};

export const useFormModal = create<FormModalState>((set, get) => ({
    data: undefined,
    isOpen: false,
    formType: "workspace",
    actionType: "create",
    onOpen: (data?: ModalFormDataType) => {
        const { actionType } = get();
        if (actionType === "create") {
            set({ isOpen: true, data: undefined });
        } else if (actionType === "update" && data) {
            set({ isOpen: true, data: data as unknown as ModalFormDataType });
        } else {
            console.error("Data must be required to handle the update");
        }
    },
    onClose: () => set({ isOpen: false }),
    setFormType: (formType: ModalFormType) => set({ formType }),
    setActionType: (actionType: "create" | "update") => set({ actionType }),
}));
