import { DeployedSuppliesProps } from "@/lib/definition";
import { getDeployedSupplies, getSpecificDeployedSupply } from "@/services/DeploySupplies/deploySuppliesServices";
import { create } from "zustand";

interface DeployedSuppliesState {
    deployedSuppliesData: DeployedSuppliesProps[];
    specificDeployedSupply: DeployedSuppliesProps | null;
    fetchSpecificDeployedSupply: (id: number) => void
    setDeployedSuppliesData: (deployedSuppliesData: DeployedSuppliesProps[]) => void;
    fetchDeployedSuppliesData: () => Promise<void>;
}

export const useDeployedSuppliesStore = create<DeployedSuppliesState>((set) => ({
    deployedSuppliesData: [],
    specificDeployedSupply: null,
    setDeployedSuppliesData: (deployedSuppliesData: DeployedSuppliesProps[]) => set({ deployedSuppliesData }),
    fetchDeployedSuppliesData: async () => {
        try {
            const allDeployedSupplies = await getDeployedSupplies();
            set({ deployedSuppliesData: allDeployedSupplies });
        } catch (error) {
            console.error("Error fetching Deployed Supplies", error);
        }
    },
    fetchSpecificDeployedSupply: async (id: number) => {
        try {
            const specificDeploy = await getSpecificDeployedSupply(id);
            set({ specificDeployedSupply: specificDeploy });
        } catch (error) {
            console.error("Error fetching specific deployed supply", error);
        }
    }
    
}));