import { ReturnedSuppliesProps } from "@/lib/definition";
import { getReturendSupplies, getSpecificReturnSupply } from "@/services/ReturnedSupplies/returnedSuppliesServices";
import { create } from "zustand";

interface ReturnedSuppliesState {
    returnedSuppliesData: ReturnedSuppliesProps[];
    specificReturnedSupply: ReturnedSuppliesProps | null;
    fetchSpecificReturnedSupply: (id: number) => void;
    setReturnedSuppliesData: (returnedSuppliesData: ReturnedSuppliesProps[]) => void;
    fetchReturnedSuppliesData: () => Promise<void>;
}

export const useReturnedSuppliesStore = create<ReturnedSuppliesState>((set) => ({
    returnedSuppliesData: [],
    specificReturnedSupply: null,
    setReturnedSuppliesData: (returnedSuppliesData: ReturnedSuppliesProps[]) => set({ returnedSuppliesData }),
    fetchReturnedSuppliesData: async () => {
        try {
            const allReturnedSupplies = await getReturendSupplies();
            set({ returnedSuppliesData: allReturnedSupplies });
        } catch (error) {
            console.error("Error fetching Returned Supplies", error);
        }
    },
    fetchSpecificReturnedSupply: async (id: number) => {
        try {
            const specificReturn = await getSpecificReturnSupply(id);
            set({ specificReturnedSupply: specificReturn });
        } catch (error) {
            console.error("Error fetching specific returned supply", error);
        }
    }
}));