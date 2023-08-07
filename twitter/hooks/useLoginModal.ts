import { create } from "zustand";

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set({isOpen: true}),
    onclose: () => set({isOpen: false}),
}));

export default useLoginModal;