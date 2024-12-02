import { create } from 'zustand';
import { CellphoneInventoryProps } from '@/lib/definition';
import { getAllCellphones, getCellphoneInventoryById } from '@/services/Cellphone/cellphoneService';
import { useCompanyStore } from '@/stores/companyStore';
import { useStatusToggleChange } from '@/stores/statusToggleStore';

interface CellphoneInventoryState {
    cellphoneInventoryList: CellphoneInventoryProps[];
    selectedCellphone: CellphoneInventoryProps | null;
    setCellphoneInventoryList: (list: CellphoneInventoryProps[]) => void;
    setSelectedCellphone: (cellphone: CellphoneInventoryProps | null) => void;
    cellphoneInventoryListRefresh: () => void;
    fetchCellphones: () => void;
}

export const useCellphoneInventoryStore = create<CellphoneInventoryState>((set, get) => ({
    cellphoneInventoryList: [],
    selectedCellphone: null,
    
    setCellphoneInventoryList: (list: CellphoneInventoryProps[]) => set({ cellphoneInventoryList: list }),
    setSelectedCellphone: (cellphone: CellphoneInventoryProps | null) => set({ selectedCellphone: cellphone }),
    
    cellphoneInventoryListRefresh: () => get().fetchCellphones(),
    
    fetchCellphones: async () => {
        const { selectedCompany } = useCompanyStore.getState();
        const { status } = useStatusToggleChange.getState();
        
        if (selectedCompany?.id) {
            try {
                const data = await getCellphoneInventoryById(selectedCompany.id);
                
                if (status === 'active') {
                    set({ cellphoneInventoryList: data?.activeCellphone || [] });
                } else {
                    set({ cellphoneInventoryList: data?.inactiveCellphone || [] });
                }
            } catch (error) {
                console.error('Error fetching cellphone inventory', error);
            }
        }
    }
}));
