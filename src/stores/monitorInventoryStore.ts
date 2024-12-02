import { create } from 'zustand'
import { MonitorProps } from '@/lib/definition'
import { getAllMonitors } from '@/services/MonitorInventory/monitorService'

interface MonitorInventoryStore {
    monitorData: MonitorProps[]
    selectedMonitorData: MonitorProps | null
    setMonitorData: (tableData: MonitorProps[]) => void
    setSelectedMonitorData: (table: MonitorProps) => void
    monitorRefresh: () => void
    fetchMonitorData: () => void
}

export const useMonitorInventoryStore = create<MonitorInventoryStore>((set, get) => ({
    monitorData: [],
    selectedMonitorData: null,
    setMonitorData: (monitorData: MonitorProps[]) => set({ monitorData }),
    setSelectedMonitorData: (table: MonitorProps) => set({ selectedMonitorData: table }),
    monitorRefresh: () => get().fetchMonitorData(),
    fetchMonitorData: async () => {
        try {
            const monitor = await getAllMonitors()
            set({ monitorData: monitor })
        } catch (error) {
            console.error('Error fetching Computer Inventories', error)
        }
    }
}))