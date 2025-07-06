import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUIStore = create(persist(set => ({filter: 'all', setFilter: (f) => set({ filter: f })}), { name: 'ui-preferences' }))

