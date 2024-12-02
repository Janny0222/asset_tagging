
import axios, { AxiosResponse } from "axios";
import { CompanyProps } from "@/lib/definition";

export const createCompany = async (companyData: CompanyProps): Promise<CompanyProps> => {
    try {
        
        const response: AxiosResponse<CompanyProps> = await axios.post('/api/company/createCompany', companyData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export const getAllCompanies = async (): Promise<CompanyProps[]> => {
    try {
        const response = await axios.get<CompanyProps[]>('/api/company/getAllCompany');
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return []
    }
}

export const getSpecificCompany = async (id: number): Promise<CompanyProps> => {
    try {
        const response = await axios.get<CompanyProps>(`/api/company/${id}/getSpecificCompany`);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const updateSpecificCompany = async (id: number, companyData: CompanyProps): Promise<CompanyProps> => {
    try {
        const response = await axios.put<CompanyProps>(`/api/company/${id}/getSpecificCompany`, companyData);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
}   