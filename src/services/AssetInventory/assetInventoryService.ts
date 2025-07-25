import axios, { AxiosResponse } from "axios";
import { AssetInventoryProps } from "@/lib/definition";
import { getSession } from "next-auth/react";
import { sequelize } from "@/lib/db";

interface AssetInventoryResponse {
    getAllActiveAsset: AssetInventoryProps[];
    getAllInactiveAsset: AssetInventoryProps[];
}



export const getAllAssetInventory = async (): Promise<AssetInventoryProps[]> => {
    const {data} = await axios.get<AssetInventoryProps[]>(`/api/assetInventory`);
    return data
}

export const getAllAssetInventoryByCompanyID = async (company_id: number): Promise<AssetInventoryProps[]> => {
    const {data} = await axios.get<AssetInventoryProps[]>(`/api/assetInventory/${company_id}/all`);
    return data
}

export const getAllAssetInventoryByCategoryAndCompanyId = async (category_id: number | string, company_id: number): Promise<AssetInventoryResponse> => {
    const session = await getSession();
    try {
        const {data}: AxiosResponse<AssetInventoryResponse> = await axios.get<AssetInventoryResponse>(`/api/assetInventory/${category_id}/category`, { 
            params: { company_id }, 
             });
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
};

export const createAssetInventory = async (assetInventoryData: AssetInventoryProps): Promise<{message: string, data: AssetInventoryProps}> => {
    try {
        const response = await axios.post<{message: string, data: AssetInventoryProps}>('/api/assetInventory', assetInventoryData);
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

export const getSpecificAssetInventory = async (asset_id: number): Promise<AssetInventoryProps> => {
    try {
        const {data}: AxiosResponse<AssetInventoryProps> = await axios.get<AssetInventoryProps>(`/api/assetInventory/${asset_id}`);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
}

export const updateSpecificAssetInventory = async (asset_id: number, assetInventoryData: AssetInventoryProps): Promise<AssetInventoryProps> => {
    try {
        const response: AxiosResponse<AssetInventoryProps> = await axios.put(`/api/assetInventory/${asset_id}`, assetInventoryData);
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

export const archiveAssetInventory = async (asset_id: number): Promise<AssetInventoryProps> => {
    try {
        const response: AxiosResponse<AssetInventoryProps> = await axios.put(`/api/assetInventory/${asset_id}/inactive`);
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

export const reActivateAssetInventory = async (asset_id: number): Promise<AssetInventoryProps> => {
    try {
        const response: AxiosResponse<AssetInventoryProps> = await axios.put(`/api/assetInventory/${asset_id}/active`);
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


export const transferAssetInventory = async (id: number | undefined, assetData: AssetInventoryProps): Promise<AssetInventoryProps> => {
    try {
        const response = await axios.put<AssetInventoryProps>(`/api/assetInventory/${id}/transfer`, assetData);
        return response.data
    } catch (error) {
        console.error('Error fetching Asset Inventory', error)
        return {}
    }
}

export const removeAssetInventory = async (asset_id: number): Promise<AssetInventoryProps> => {
    try {
        const response: AxiosResponse<AssetInventoryProps> = await axios.put(`/api/assetInventory/${asset_id}/remove`);
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


