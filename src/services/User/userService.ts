import axios, { AxiosResponse } from "axios";
import { UserProps } from "@/lib/definition";

export const getAllUsers = async (): Promise<UserProps[]> => {
    try {
        const response: AxiosResponse<UserProps[]> = await axios.get("/api/user",);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            throw new Error(errorMessage);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const createUser = async (userData: UserProps): Promise<UserProps> => {
    try {
        const response: AxiosResponse<UserProps> = await axios.post("/api/user", userData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            throw new Error(errorMessage);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}