import { create } from 'zustand'
import { ComputerInventoryProps } from '@/lib/definition'
import { getComputerInventory } from '@/services/ComputerInventory/computerService'

interface ComputerInventoryStore {
    computerData: ComputerInventoryProps[]
    selectedComputerData: ComputerInventoryProps | null
    setComputerData: (tableData: ComputerInventoryProps[]) => void
    setSelectedComputerData: (table: ComputerInventoryProps) => void
    computerRefresh: () => void
    fetchComputerData: () => void
}

export const useComputerInventoryStore = create<ComputerInventoryStore>((set, get) => ({
    computerData: [],
    selectedComputerData: null,
    setComputerData: (computerData: ComputerInventoryProps[]) => set({ computerData }),
    setSelectedComputerData: (table: ComputerInventoryProps) => set({ selectedComputerData: table }),
    computerRefresh: () => get().fetchComputerData(),
    fetchComputerData: async () => {
        try {
            const computer = await getComputerInventory()
            set({ computerData: computer })
        } catch (error) {
            console.error('Error fetching Computer Inventories', error)
        }
    }
}))