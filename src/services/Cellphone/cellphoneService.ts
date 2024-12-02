import axios, { AxiosResponse } from "axios";
import { CellphoneInventoryProps } from "@/lib/definition";

interface ActiveInactiveCellphoneResponse {
    activeCellphone: CellphoneInventoryProps[];
    inactiveCellphone: CellphoneInventoryProps[];
    activeCount: number;
    inactiveCount: number;
}

export const getAllCellphones = async (): Promise<CellphoneInventoryProps[]> => {
    try {
        const response: AxiosResponse<CellphoneInventoryProps[]> = await axios.get('/api/cellphone');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export const createCellphoneInventory = async (cellphoneData: CellphoneInventoryProps): Promise<CellphoneInventoryProps> => {
    try {
        const response: AxiosResponse<CellphoneInventoryProps> = await axios.post('/api/cellphone', cellphoneData);
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

export const getCellphoneInventoryById = async (id: number | undefined ): Promise<ActiveInactiveCellphoneResponse | null> => {
    const { data } = await axios.get<ActiveInactiveCellphoneResponse>(`/api/cellphone/${id}`);
    return data
}

export const getSpecificCellphoneDataById = async (id: number | undefined): Promise<CellphoneInventoryProps> => {
    try {
        const response = await axios.get<CellphoneInventoryProps>(`/api/cellphone/${id}/edit`);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const updateSpecificCellphoneDataById = async (id: number | undefined, cellphoneData: CellphoneInventoryProps): Promise<CellphoneInventoryProps> => {
    try {
        const response = await axios.put<CellphoneInventoryProps>(`/api/cellphone/${id}/edit`, cellphoneData);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const archiveCellphoneInventory = async (id: number | undefined): Promise<CellphoneInventoryProps> => {
    try {
         const respose = await axios.put<CellphoneInventoryProps>(`/api/cellphone/${id}/inactive`)
            return respose.data
    } catch (error ) {
        console.error('Error archiving Company', error)
        throw error
    }
}

export const reArchiveCellphoneInventory = async (id: number | undefined): Promise<CellphoneInventoryProps> => {
    try {
         const respose = await axios.put<CellphoneInventoryProps>(`/api/cellphone/${id}/active`)
            return respose.data
    } catch (error ) {
        console.error('Error archiving Company', error)
        throw error
    }
}

export const transferCellphoneInventory = async (id: number | undefined, cellphoneData: CellphoneInventoryProps): Promise<CellphoneInventoryProps> => {
    try {
        const response = await axios.put<CellphoneInventoryProps>(`/api/cellphone/${id}/transfer`, cellphoneData);
        return response.data
    } catch (error) {
        console.error('Error fetching Company', error)
        return {}
    }
}