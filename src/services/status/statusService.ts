import axios from "axios";
import { StatusProps } from "@/lib/definition";

export const getAllStatus = async (): Promise<StatusProps[]> => {
    try {
        const response = await axios.get<StatusProps[]>("/api/status");
        return response.data;
    } catch (error) {
        console.error("Error fetching Status", error);
        return [];
    }
}

export const getSpecificStatus = async (id: number): Promise<StatusProps> => {
    try {
        const response = await axios.get<StatusProps>(`/api/status/${id}`);
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