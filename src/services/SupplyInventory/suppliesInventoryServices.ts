import { SupplyInventoryProps } from '@/lib/definition';
import axios, { AxiosResponse } from "axios";

export const getAllSuppliesInventory = async (): Promise<SupplyInventoryProps[]> => {
    const {data} = await axios.get<SupplyInventoryProps[]>(`/api/supplyInventory`);
    return data;
}

export const createSupplyInventory = async (supplyData: SupplyInventoryProps): Promise<SupplyInventoryProps> => {
    try {
        const response: AxiosResponse<SupplyInventoryProps> = await axios.post(`/api/supplyInventory`, supplyData);
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

export const getSpecificSupplyInventory = async (id: number): Promise<SupplyInventoryProps | null> => {
    try {
        const response: AxiosResponse<SupplyInventoryProps> = await axios.get(`/api/supplyInventory/${id}`);
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

export const updateSupplyInventory = async (id: number, supplyData: SupplyInventoryProps): Promise<SupplyInventoryProps> => {
    try {
        const response: AxiosResponse<SupplyInventoryProps> = await axios.put(`/api/supplyInventory/${id}`, supplyData);
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