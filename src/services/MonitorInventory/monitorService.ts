
import { MonitorProps } from "@/lib/definition";
import axios, { AxiosResponse } from "axios";


export const createMonitor = async (monitorData: MonitorProps): Promise<MonitorProps> => {
    try {
        const response: AxiosResponse<MonitorProps> = await axios.post('/api/monitor', monitorData);
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

export const getAllMonitorByCompany = async (company_id: number | undefined): Promise<MonitorProps[]> => {
    try {
        const response = await axios.get<MonitorProps[]>(`/api/monitor/${company_id}`);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return []
    }
}

export const getAllMonitors = async (): Promise<MonitorProps[]> => {
    try {
        const response = await axios.get<MonitorProps[]>('/api/monitor');
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return []
    }
}

export const getSpecificMonitor = async (id: number): Promise<MonitorProps> => {
    try {
        const response = await axios.get<MonitorProps>(`/api/monitor/${id}/edit`);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
}

export const updateMonitor = async (id: number, monitorData: MonitorProps): Promise<MonitorProps> => {
    try {
        const response: AxiosResponse<MonitorProps> = await axios.put(`/api/monitor/${id}/edit`, monitorData);
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