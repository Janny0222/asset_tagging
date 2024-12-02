import React, {createContext, useContext, useEffect, useState} from "react";
import { ComputerInventoryProps, ComputerInventoryContextType } from "@/lib/definition";
import { getAllInactiveComputerInventory, getComputerInventory, getComputerInventoryById } from "@/services/ComputerInventory/computerService";
import { CompanyContext } from "./CompanyContext";
import { useStatusToggle } from "./ToggleContext";
import { useCompanyStore } from "@/stores/companyStore";

const defaultContext: ComputerInventoryContextType = {
    computerInventoryList: [],
    setComputerInventoryList: () => {},
    selectedComputer: {},
    setSelectedComputer: () => {},
    computerInventoryListRefresh: () => {},
    inactiveCount: 0,
    activeCount: 0
}

export const ComputerInventoryContext = createContext<ComputerInventoryContextType>(defaultContext);

export const ComputerInventoryProvider = ({ children }: { children: React.ReactNode }) => {
    const {status, toggleStatus} = useStatusToggle();
    const [computerInventoryList, setComputerInventoryList] = useState<ComputerInventoryProps[]>([]);
    const [selectedComputer, setSelectedComputer] = useState<ComputerInventoryProps>();
    const { selectedCompany } = useCompanyStore();
    const [inactiveCount, setInactiveCount] = useState<number>(0)
    const [activeCount, setActiveCount] = useState<number>(0)


    // fetching all monitor data based on selected company
    const fetchComputerDataByCompany = async (company_table: number | undefined) => {
        const data = await getComputerInventoryById(company_table);
        setComputerInventoryList(data?.activeComputers ? data?.activeComputers : []);
        setActiveCount(data?.activeCount ? data?.activeCount : 0)
    };

    const fetchInactiveComputerByCompany = async (company_table: number | undefined) => {
        const data = await getAllInactiveComputerInventory(company_table)
        setComputerInventoryList(data.specificComputer ? data.specificComputer : []);
        setInactiveCount(data.inactiveCount ? data.inactiveCount : 0)
    }

    // trigger when the page is loaded
    useEffect(() => {
        if(status === 'active') {
            fetchComputerDataByCompany(selectedCompany?.id);
        } else {
            fetchInactiveComputerByCompany(selectedCompany?.id)
        }
        
    }, [selectedCompany?.id, status]);

    // trigger when successfully submit a new data
    const computerInventoryListRefresh = () => {
        if(status === 'active') {
            fetchComputerDataByCompany(selectedCompany?.id);
        } else {
            fetchInactiveComputerByCompany(selectedCompany?.id)
        }
    };


    return (
        <ComputerInventoryContext.Provider
            value={{
                computerInventoryList,
                setComputerInventoryList,
                selectedComputer: selectedComputer || null,
                setSelectedComputer,
                computerInventoryListRefresh,
                inactiveCount,
                activeCount
            }}
        >
            {children}
        </ComputerInventoryContext.Provider>
    )
}