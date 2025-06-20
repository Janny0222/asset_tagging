import { SupplyInventoryProps } from "@/lib/definition";
import { getAllSuppliesInventory, getSpecificSupplyInventory } from "@/services/SupplyInventory/suppliesInventoryServices";
import { create } from "zustand";

interface SupplyInventoryState {
    suppliesInventoryData: SupplyInventoryProps[];
    specificSupplyInventoryData?: SupplyInventoryProps | null;
    setSuppliesInventoryData: (suppliesInventoryData: SupplyInventoryProps[]) => void;
    fetchAllSuppliesInventoryData: () => Promise<void>;
    fetchSpecificSupplyInventoryData: (id: number | undefined) => void;
}

export const useSupplyInventoryStore = create<SupplyInventoryState>((set) => ({
    suppliesInventoryData: [],
    specificSupplyInventoryData: null,
    setSuppliesInventoryData: (suppliesInventoryData: SupplyInventoryProps[]) => set({ suppliesInventoryData }),
    fetchAllSuppliesInventoryData: async () => {
        try {
            const allSupplies = await getAllSuppliesInventory();
            set({ suppliesInventoryData: allSupplies });
        } catch (error) {
            console.error("Error fetching Supplies Inventories", error);
        }
    },
    fetchSpecificSupplyInventoryData: async (id: number | undefined) => {
        try {
            const specificSupply = await getSpecificSupplyInventory(id!);
            set({ specificSupplyInventoryData: specificSupply });
        } catch (error) {
            console.error("Error fetching specific Supply Inventory", error);
        }
    },
}));