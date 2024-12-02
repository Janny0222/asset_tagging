import { CategoryProps } from "@/lib/definition";
import axios, {AxiosResponse} from "axios";

export const getAllCategory = async (): Promise<CategoryProps[]> => {
    try {
        const response: AxiosResponse<CategoryProps[]> = await axios.get('/api/category');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
};

export const getSpecificCategoryData = async (id: number): Promise<CategoryProps> => {
    try {
        const response: AxiosResponse<CategoryProps> = await axios.get(`/api/category/${id}`);
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

export const createCategory = async (categoryData: CategoryProps): Promise<CategoryProps> => {
    try {
        const response: AxiosResponse<CategoryProps> = await axios.post('/api/category', categoryData);
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

export const updateSpecificCompany = async (id: number, companyData: CategoryProps): Promise<CategoryProps> => {
    try {
        const response = await axios.put<CategoryProps>(`/api/company/${id}/getSpecificCompany`, companyData);
        return response.data
    } catch(error) {
        console.error('Error fetching Company', error)
        return {}
    }
} 