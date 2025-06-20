import { DeployedSuppliesProps } from "@/lib/definition";
import axios, { AxiosResponse } from "axios";

export const getDeployedSupplies = async (): Promise<DeployedSuppliesProps[]> => {
    const { data } = await axios.get<DeployedSuppliesProps[]>(`/api/deploySupplies`);
    return data;
}

export const createDeployedSupply = async (supplyData: DeployedSuppliesProps): Promise<DeployedSuppliesProps> => {
    try {
        const response: AxiosResponse<DeployedSuppliesProps> = await axios.post(`/api/deploySupplies`, supplyData);
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

export const getSpecificDeployedSupply = async (id: number): Promise<DeployedSuppliesProps | null> => {
    try {
        const response: AxiosResponse<DeployedSuppliesProps> = await axios.get(`/api/deploySupplies/${id}`);
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