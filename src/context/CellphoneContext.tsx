import { CellphoneInventoryContextType, CellphoneInventoryProps } from "@/lib/definition";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAllCellphones, getCellphoneInventoryById } from "../services/Cellphone/cellphoneService";
import { CompanyContext } from "./CompanyContext";
import { useStatusToggle } from "./ToggleContext";
import { useCompanyStore } from "@/stores/companyStore";

const defaultContext: CellphoneInventoryContextType = {
    cellphoneInventoryList: [],
    setCellphoneInventoryList: () => {},
    selectedCellphone: null,
    setSelectedCellphone: () => {},
    cellphoneInventoryListRefresh: () => {},
   
};

const CellphoneInventoryContext = createContext<CellphoneInventoryContextType>(defaultContext);

export const CellphoneInventoryProvider = ({ children }: { children: React.ReactNode }) => {
    const { selectedCompany} = useCompanyStore();
    const { status } = useStatusToggle()
    const [cellphoneInventoryList, setCellphoneInventoryList] = useState<CellphoneInventoryProps[]>([]);
    const [selectedCellphone, setSelectedCellphone] = useState<CellphoneInventoryProps | null>(null);

    const fetchCellphones = async () => {
        const response = await getAllCellphones();
        setCellphoneInventoryList(response);
    }
   
    const fetchCellphoneData =  useCallback(() => {
        const fetchCellphoneDataByCompany = async (company_table: number | undefined) => {
            const data = await getCellphoneInventoryById(company_table);
       
            if (status === 'active') {
            setCellphoneInventoryList(data?.activeCellphone ? data?.activeCellphone : []);
            } else {
            setCellphoneInventoryList(data?.inactiveCellphone ? data?.inactiveCellphone : []);
            }
        }
        fetchCellphoneDataByCompany(selectedCompany?.id);
    }, [selectedCompany?.id, status]) 
        

    useEffect(() => {
        fetchCellphoneData();
    }, [, status, fetchCellphoneData]);

    const cellphoneInventoryListRefresh = () => {
        fetchCellphoneData();
    }
    return (
        <CellphoneInventoryContext.Provider
            value={{
                cellphoneInventoryList,
                setCellphoneInventoryList,
                selectedCellphone,
                setSelectedCellphone,
                cellphoneInventoryListRefresh
            }}
        >
            {children}
        </CellphoneInventoryContext.Provider>
    )
}

export const useCellphone = () => useContext(CellphoneInventoryContext)