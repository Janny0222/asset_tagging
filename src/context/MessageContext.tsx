import React, { createContext, useContext, useEffect, useState } from 'react'

interface MessageContextProps {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

const defaultContext: MessageContextProps = {
    message: '',
    setMessage: () => {},
}

const MessageContext = createContext<MessageContextProps>(defaultContext)

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<string>('')
    
    return (
        <MessageContext.Provider
            value={{
                message,
                setMessage,
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export const useMessage = () => useContext(MessageContext)