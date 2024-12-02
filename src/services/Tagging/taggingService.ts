import axios, { AxiosResponse } from "axios";
import { TaggingProps } from "@/lib/definition";

interface TaggingResponse {
    allTaggings: TaggingProps[];
    specificTaggings: TaggingProps[];
}

export const getTagging = async (tagging: string): Promise<TaggingProps[]> => {
    const { data } = await axios.get<TaggingProps[]>(`/api/tagging/${tagging}` )
    return data
}

export const getSpecificTagging = async (tagging: string): Promise<TaggingProps> => {
   try {
    const response: AxiosResponse<TaggingProps> = await axios.get<TaggingProps>(`/api/tagging/${tagging}` )
    return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred!';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred!');
        }
    }
}
 
export const getTaggingByCategory = async (id: number, asset_type: number): Promise<TaggingProps[]> => {
    const { data } = await axios.get<TaggingProps[]>(`/api/tagging/${id}/asset` , {params: {asset_type}})
    return data
}

// export const getSpecificTagging = async (tagging: number | string): Promise<TaggingProps> => {
//     try {
//         const { data }: AxiosResponse<TaggingProps> = await axios.get<TaggingProps>(`/api/tagging/${tagging}`)
//         return data
//     } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//             const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
//             throw new Error(errorMessage);
//         } else {
//             throw new Error('An unknown error occurred');
//         }
//     }
    
// }
export const createTagging = async (taggingData: TaggingProps): Promise<TaggingProps> => {
   try {
    const response: AxiosResponse<TaggingProps> = await axios.post<TaggingProps>('/api/tagging', taggingData)
    return response.data
   } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred');
        }
    }  
}

export const getTaggingSuggestions = async (tagging: string): Promise<TaggingProps[]> => {
    try {
     const response: AxiosResponse<TaggingProps[]> = await axios.get<TaggingProps[]>(`/api/tagging/asset-tagging`, {
         params: {tagging } 
     });
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