import { PortProps } from "@/lib/definition";
import axios from "axios";

export const getAllPorts = async (): Promise<PortProps[]> => {
    try {
        const response = await axios.get<PortProps[]>('/api/ports');
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return []
    }
}