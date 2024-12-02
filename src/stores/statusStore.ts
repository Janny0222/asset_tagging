import { create } from 'zustand'
import { StatusProps } from '@/lib/definition'
import { getAllStatus, getSpecificStatus } from '@/services/status/statusService'

interface StatusState {
    statusData: StatusProps[]
    selectedStatus: StatusProps | null
    setStatusData: (statusData: StatusProps[]) => void
    setSelectedStatus: (statusData: StatusProps) => void
    statusRefresh: () => Promise<void>
    fetchStatusData: () => Promise<void>
    fetchSpecificStatusData: (id: number) => void
}

export const useStatusStore = create<StatusState>((set, get) => ({
    statusData: [],
    selectedStatus: null,
    setStatusData: (statusData: StatusProps[]) => set({ statusData }),
    setSelectedStatus: (statusData: StatusProps) => set({ selectedStatus: statusData }),
    statusRefresh: async () => {
        const statusData = await getAllStatus()
        set({ statusData })
    },
    fetchStatusData: async () => {
        const statusData = await getAllStatus()
        set({ statusData })
    },
    fetchSpecificStatusData: async (id: number) => {
        try {
            const selectedStatus = await getSpecificStatus(id)
            set({ selectedStatus })
        } catch (error) {
            console.error('Error fetching Status', error)
        }
    }
}))