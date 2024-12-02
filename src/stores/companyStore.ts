import { create } from 'zustand'
import { CompanyProps } from '@/lib/definition'
import { getAllCompanies, getSpecificCompany } from '@/services/Company/companyService'

interface CompanyState {
    companyData: CompanyProps[]
    selectedCompany: CompanyProps | null
    setTableData: (tableData: CompanyProps[]) => void
    setSelectedCompany: (table: CompanyProps) => void
    companyRefresh: () => void
    fetchCompanyData: () => void
    fetchSelectedCompanyData: (id: number) => void
}

export const useCompanyStore = create<CompanyState>((set, get) => ({
    companyData: [],
    selectedCompany: null,
    setTableData: (companyData: CompanyProps[]) => set({ companyData }),
    setSelectedCompany: (table: CompanyProps) => set({ selectedCompany: table }),
    companyRefresh: () => get().fetchCompanyData(),
    fetchCompanyData: async () => {
        try {
            const companies = await getAllCompanies()
            set({ companyData: companies })
        } catch (error) {
            console.error('Error fetching Companies', error)
        }
    },
    fetchSelectedCompanyData: async (id: number) => {
        try {
            const selectedCompany = await getSpecificCompany(id)
            set({ selectedCompany })
        } catch (error) {
            console.error('Error fetching Company', error)
        }
    }
    
}))