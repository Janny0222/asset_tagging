import React, { createContext, useEffect, useState } from "react";
import { PortProps, PortContextProps } from "@/lib/definition";
import { getAllPorts } from "@/services/Port/portService";

const defaultContext: PortContextProps = {
    portList: [],
    selectedPort: null,
    setSelectedPort: () => {},
    setPortList: () => {},
    portRefresh: () => {},
};

export const PortContext = createContext<PortContextProps>(defaultContext);

export const PortProvider = ({ children }: { children: React.ReactNode }) => {
    const [portList, setPortList] = useState<PortProps[]>([]);
    const [selectedPort, setSelectedPort] = useState<PortProps | null>(null);

    const portRefresh = () => {
        fetchPorts();
    };
    const fetchPorts = async () => {
        const response = await getAllPorts();
        
        setPortList(response);
    };
    useEffect(() => {
        fetchPorts();
    }, [])

    return (
        <PortContext.Provider
            value={{
                portList,
                setPortList,
                selectedPort,
                setSelectedPort,
                portRefresh
            }}>
            {children}
        </PortContext.Provider>
    )
}