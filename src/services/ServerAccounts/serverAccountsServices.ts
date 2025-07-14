import { ServerAccountsProps } from '@/lib/definition';
import axios, { AxiosResponse } from "axios";

export const getAllServerAccounts = async (id: any): Promise<ServerAccountsProps[]> => {
    const { data } = await axios.get<ServerAccountsProps[]>(`/api/serverAccounts?company_id=${id}`);
    return data;
}

export const createServerAccount = async (company_id: number, formData: ServerAccountsProps): Promise<{ message: string; data: ServerAccountsProps }> => {
    try {
        const response = await axios.post<{ message: string; data: ServerAccountsProps }>(`/api/serverAccounts?company_id=${company_id}`, formData);
            return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
    
}

export const getSpecificServerAccount = async (id: number): Promise<ServerAccountsProps> => {
    const { data } = await axios.get<ServerAccountsProps>(`/api/serverAccounts/${id}`);
    return data;
}

export const updateServerAccount = async (id: number, formData: ServerAccountsProps): Promise<{message: string; data: ServerAccountsProps}> => {
    try {
        const response = await axios.put<{message: string; data: ServerAccountsProps}>(`/api/serverAccounts/${id}`, formData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
}

export const deleteServerAccount = async (id: number): Promise<{ message: string }> => {
    try {
        const response: AxiosResponse<{ message: string }> = await axios.delete(`/api/serverAccounts/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
}