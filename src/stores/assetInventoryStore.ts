import { 
    getAllAssetInventory, 
    removeAssetInventory, 
    transferAssetInventory, 
    getAllAssetInventoryByCategoryAndCompanyId, 
    getSpecificAssetInventory, 
    getAllAssetInventoryByCompanyID} from '@/services/AssetInventory/assetInventoryService';

import { create } from 'zustand'
import { AssetInventoryProps } from '@/lib/definition'
import { useCategoryStore } from '@/stores/categoryStore';
import { useCompanyStore } from './companyStore';
import { useStatusToggleChange } from './statusToggleStore';

interface AssetInventoryState {
    assetInventoryData: AssetInventoryProps[];
    selectedAssetInventory: AssetInventoryProps | null;
    setAssetInventoryData: (assetInventoryData: AssetInventoryProps[]) => void;
    setSelectedAssetInventory: (assetInventoryData: AssetInventoryProps) => void;
    assetInventoryRefresh: () => Promise<void>;
    fetchAllAssetInventoryData: () => Promise<void>;
    fetchAllAssetInventoryDataByCompanyID: (id: number) => Promise<void>;
    fetchAssetInventoryData: () => Promise<void>;
    fetchSpecificAssetInventoryData: (id: number) => void;
    transferAsset: (id: number, assetData: AssetInventoryProps) => Promise<void>;
    removeAsset: (id: number) => Promise<void>;
}



export const useAssetInventoryStore = create<AssetInventoryState>((set) => ({
    
    assetInventoryData: [],
    selectedAssetInventory: null,
    setAssetInventoryData: (assetInventoryData: AssetInventoryProps[]) => set({ assetInventoryData }),
    setSelectedAssetInventory: (assetInventoryData: AssetInventoryProps) => set({ selectedAssetInventory: assetInventoryData }),
    fetchAllAssetInventoryData: async () => {
        try {
            const allAsset = await getAllAssetInventory();
            set({ assetInventoryData: allAsset })
        } catch (error) {
            console.error('Error fetching Asset Inventories', error)
        }
    },
    fetchAllAssetInventoryDataByCompanyID: async (id: number) => {
        try {
            const allAsset = await getAllAssetInventoryByCompanyID(id);
            set({ assetInventoryData: allAsset })
        } catch (error) {
            console.error('Error fetching Asset Inventories by Company ID', error)
        }
    },
    fetchAssetInventoryData: async () => {
        const selectedCategory  = useCategoryStore.getState().selectedCategory
        const selectedCompany = useCompanyStore.getState().selectedCompany
        const status = useStatusToggleChange.getState().status

        try {
            const asset = await getAllAssetInventoryByCategoryAndCompanyId(selectedCategory?.id!, selectedCompany?.id!);
            if(status === 'active') {
                set({ assetInventoryData: asset.getAllActiveAsset })
            } else {
                set({ assetInventoryData: asset.getAllInactiveAsset })
            }
        } catch (error) {
            console.error('Error fetching Computer Inventories', error)
        }
    },
    fetchSpecificAssetInventoryData: async (id: number) => {
        try {
            const assetInventory = await getSpecificAssetInventory(id);
            set({ selectedAssetInventory: assetInventory })
        } catch (error) {
            console.error('Error fetching Asset Inventories', error)
        }
    },
    assetInventoryRefresh: async () => {
        await useAssetInventoryStore.getState().fetchAssetInventoryData()
    },
    transferAsset: async (id: number, assetData: AssetInventoryProps) => {
        try {
            const transferAsset = await transferAssetInventory(id, assetData);
            set((state) => {
                const updatedInventoryData = state.assetInventoryData.map((inventory) => 
                    inventory.id === id ? transferAsset : inventory
                )
                return { assetInventoryData: updatedInventoryData, selectedAssetInventory: transferAsset }
            })
        } catch (error) {
            console.error('Error fetching Asset Inventories', error)
        }
    },
    removeAsset: async (id: number) => {
        try {
            const removeAsset = await removeAssetInventory(id);
            set((state) => {
                const updatedInventoryData = state.assetInventoryData.filter((inventory) => 
                    inventory.id !== id
                )
                return { assetInventoryData: updatedInventoryData, selectedAssetInventory: removeAsset }
            })
        } catch (error) {
            console.error('Error fetching Asset Inventories', error)
        }
    }
}))

