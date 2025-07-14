import { ServerAccountsProps } from "@/lib/definition";
import { getAllServerAccounts, getSpecificServerAccount } from "@/services/ServerAccounts/serverAccountsServices";
import { create } from "zustand";

interface ServerAccountsState {
    serverAccountsData: ServerAccountsProps[];
    specificServerAccountData: ServerAccountsProps | null;
    setServerAccountsData: (serverAccountsData: ServerAccountsProps[]) => void;
    fetchAllServerAccountsData: (id: any) => Promise<void>;
    fetchSpecificServerAccountData: (id: number) => Promise<void>;
}

export const useServerAccountsStore = create<ServerAccountsState>((set) => ({
    serverAccountsData: [],
    specificServerAccountData: null,
    setServerAccountsData: (serverAccountsData: ServerAccountsProps[]) => set({ serverAccountsData }),
    fetchAllServerAccountsData: async (id: any) => {
        try {
            const allServerAccounts = await getAllServerAccounts(id);
            set({ serverAccountsData: allServerAccounts });
        } catch (error) {
            console.error("Error fetching Server Accounts", error);
        }
    },
    fetchSpecificServerAccountData: async (id: number) => {
        try {
            const specificServerAccount = await getSpecificServerAccount(id);
            set({ specificServerAccountData: specificServerAccount });
        } catch (error) {
            console.error("Error fetching specific Server Account", error);
        }
    },
}));