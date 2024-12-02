import React, { createContext, useContext, useState } from 'react'

interface StatusToggleContextType {
    status: string
    setStatus: (value: string) => void;
    toggleStatus: () => void;
}

const StatusToggleContext = createContext<StatusToggleContextType>({
    status: 'active',
    setStatus: () => {},
    toggleStatus: () => {},
})

export const StatusToggleProvider = ({ children }: { children: React.ReactNode }) => {
    const [status, setStatus] = useState('active');

    const toggleStatus = () => {
        setStatus((prevStatus) => (prevStatus === 'active' ? 'inactive' : 'active'));
    }
    console.log(status)
    return (
        <StatusToggleContext.Provider value={{ status, setStatus, toggleStatus }}>
            {children}
        </StatusToggleContext.Provider>
    )
}

export const useStatusToggle = () => useContext(StatusToggleContext)