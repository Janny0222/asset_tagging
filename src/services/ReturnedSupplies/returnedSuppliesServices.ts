import { ReturnedSuppliesProps } from "@/lib/definition";
import axios, { AxiosResponse } from "axios";

export const getReturendSupplies = async (): Promise<ReturnedSuppliesProps[]> => {
    const { data } = await axios.get<ReturnedSuppliesProps[]>(`/api/returnSupplies`);
    return data;
}

export const createReturnSupply = async (supplyData: ReturnedSuppliesProps): Promise<ReturnedSuppliesProps> => {
    try {
        const response: AxiosResponse<ReturnedSuppliesProps> = await axios.post(`/api/returnSupplies`, supplyData);
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

export const getSpecificReturnSupply = async (id: number): Promise<ReturnedSuppliesProps | null> => {
    try {
        const response: AxiosResponse<ReturnedSuppliesProps> = await axios.get(`/api/returnSupplies/${id}`);
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