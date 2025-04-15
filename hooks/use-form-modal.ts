import { create } from "zustand";

export type ModalFormType = "workspace" | "project";

type FormModalState = {
    // Dialog state management
    isOpen: boolean;
    onOpen: (id?: string) => void;
    onClose: () => void;

    // Form state management
    id?: string;
    formType: ModalFormType;
    actionType: "create" | "update";
    setFormType: (formType: ModalFormType) => void;
    setActionType: (actionType: "create" | "update") => void;
};

export const useFormModal = create<FormModalState>((set, get) => ({
    id: undefined,
    isOpen: false,
    formType: "workspace",
    actionType: "create",
    onOpen: (id?: string) => {
        const { actionType } = get();
        if (actionType === "create") {
            set({ isOpen: true, id: undefined });
        } else if (actionType === "update" && id) {
            set({ isOpen: true, id });
        } else {
            console.error("An ID is required to update data.");
        }
    },
    onClose: () => set({ isOpen: false }),
    setFormType: (formType: ModalFormType) => set({ formType }),
    setActionType: (actionType: "create" | "update") => set({ actionType }),
}));
