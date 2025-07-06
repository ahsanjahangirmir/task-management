import { create } from 'zustand'

export const useUIStore = create(set => ({editingTaskId: null, setEditingTaskId: id => set({ editingTaskId: id }), }))
