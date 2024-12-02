import { create } from 'zustand'

interface StatusToggleStore {
    status: string;
    setStatus: (value: string) => void;
    toggleStatus: () => void;
}

export const useStatusToggleChange = create<StatusToggleStore>((set) => ({
    status: 'active',
    setStatus: (value) => set({ status: value }),
    toggleStatus: () => 
        set((state) => ({ status: state.status === 'active' ? 'inactive' : 'active' }))
}))