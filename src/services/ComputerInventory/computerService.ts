import axios from 'axios'
import { ComputerInventoryProps } from '@/lib/definition'

interface InactiveComputerResponse {
    specificComputer: ComputerInventoryProps[];
    inactiveCount: number;
}
interface ActiveInactiveComputerResponse {
    activeComputers: ComputerInventoryProps[];
    inactiveComputer: ComputerInventoryProps[];
    activeCount: number;
    inactiveCount: number;
}

export const getComputerInventory = async (): Promise<ComputerInventoryProps[]> => {
    const { data } = await axios.get<ComputerInventoryProps[]>('/api/computer')
    return data
}

export const createComputerInvetory = async (compunterData: ComputerInventoryProps): Promise<ComputerInventoryProps> => {
    const { data } = await axios.post<ComputerInventoryProps>('/api/computer', compunterData)
    return data
}

export const getComputerInventoryById = async (id: number | undefined ): Promise<ActiveInactiveComputerResponse | null> => {
        const { data } = await axios.get<ActiveInactiveComputerResponse>(`/api/computer/${id}`);
        return data
}

export const getSpecificComputerInventory = async (id: number | undefined): Promise<ComputerInventoryProps> => {
    try {
        const response = await axios.get<ComputerInventoryProps>(`/api/computer/${id}/edit`);
        return response.data
    } catch (error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const updateSpecificComputerInventory = async (id: number | undefined, computerData: ComputerInventoryProps): Promise<ComputerInventoryProps> => {
    try {
        const response = await axios.put<ComputerInventoryProps>(`/api/computer/${id}/edit`, computerData);
        return response.data
    } catch (error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const deleteComputerInventory = async (id: number | undefined): Promise<ComputerInventoryProps> => {
    try {
         const respose = await axios.put<ComputerInventoryProps>(`/api/computer/${id}/delete`)
            return respose.data
    } catch (error ) {
        console.error('Error archiving Company', error)
        throw error
    }
}

export const archiveComputerInventory = async (id: number | undefined): Promise<ComputerInventoryProps> => {
    try {
         const respose = await axios.put<ComputerInventoryProps>(`/api/computer/${id}/inactive`)
            return respose.data
    } catch (error ) {
        console.error('Error archiving Company', error)
        throw error
    }
}

export const getAllInactiveComputerInventory = async (id: number | undefined): Promise<InactiveComputerResponse> => {
    const { data } = await axios.get<InactiveComputerResponse>(`/api/computer/${id}/inactive`)
    return data
}

export const reArchivedComputerInventory = async (id: number | undefined): Promise<ComputerInventoryProps> => {
    try {
         const respose = await axios.put<ComputerInventoryProps>(`/api/computer/${id}/active`)
            return respose.data
    } catch (error ) {
        console.error('Error archiving Company', error)
        throw error
    }
}

export const transferComputerInventory = async (id: number | undefined, computerData: ComputerInventoryProps): Promise<ComputerInventoryProps> => {
    try {
        const response = await axios.put<ComputerInventoryProps>(`/api/computer/${id}/transfer`, computerData);
        return response.data
    } catch (error) {
        console.error('Error fetching Company', error)
        return {}
    }
}