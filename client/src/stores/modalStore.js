import create from 'zustand'

export const useModalStore = create(set => ({isOpen: false, taskToEdit: null, openModal: (task = null) => set({ isOpen: true, taskToEdit: task }), closeModal: () => set({ isOpen: false, taskToEdit: null }),}))