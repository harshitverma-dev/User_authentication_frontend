import React, { createContext, useState } from 'react'

export const Message = createContext();
export const Condition = createContext()

const ContextProvider = ({ children }) => {
    const [showMessage, setShowMessage] = useState("");
    const [alertCondition, setAlertCondition] = useState("")

    return (
        <Message.Provider value={{ showMessage, setShowMessage }}>
            <Condition.Provider value={{ alertCondition, setAlertCondition }}>
                {children}
            </Condition.Provider>
        </Message.Provider>
    )

}


export default ContextProvider;