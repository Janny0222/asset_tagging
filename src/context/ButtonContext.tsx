import React, {createContext, useContext, useState, ReactNode} from "react";
import { ButtonContextProps } from "@/lib/definition";

const ButtonContext = createContext<ButtonContextProps | undefined>(undefined);

export const ButtonProvider = ({ children }: { children: ReactNode }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);

    const toggleCreate = () => setIsCreating(!isCreating);
    const toggleEdit = (id: number | undefined) => {
        console.log(id)
        setIsEditing(!isEditing);
    } 
    const toggleArchive = (id: number) => setIsArchiving(!isArchiving);
    return (
        <ButtonContext.Provider
            value={{
                isCreating,
                isEditing,
                isArchiving,
                setIsEditing,
                setIsArchiving,
                toggleCreate,
                toggleEdit,
                toggleArchive,
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
};

export const useButtonContext = () => {
    const context = useContext(ButtonContext);
    if (context === undefined) {
        throw new Error("useButtonContext must be used within a ButtonProvider");
    }
    return context;
};