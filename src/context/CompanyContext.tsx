import { CompanyContextType, CompanyProps } from "@/lib/definition";
import { getAllCompanies } from "@/services/Company/companyService";
import { createContext, useContext, useEffect, useState } from "react";

const defaultContext: CompanyContextType = {
    tableData: [],
    selectedCompany: null,
    setSelectedCompany: () => {},
    setTableData: () => {},
    companyRefresh: () => {},
  }
export const CompanyContext = createContext<CompanyContextType>(defaultContext)

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
    const [tableData, setTableData] = useState<CompanyProps[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyProps | null>(null);

    const fetchData = async () => {
        try {
            const companies = await getAllCompanies()
            setTableData(companies)
        } catch (error) {
            console.error('Error fetching Company', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    const companyRefresh = () => {
        fetchData()
    }
    return (
        <CompanyContext.Provider value={{tableData, setTableData, selectedCompany, setSelectedCompany, companyRefresh}}>
            {children}
        </CompanyContext.Provider>
    )
}
export const useCompanyContext = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompanyContext must be used within a CompanyProvider');
    }
    return context;
};