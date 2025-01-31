import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [isLogined, setIsLogined] = useState(false);

    return (
        <AppContext.Provider value={{ isLogined, setIsLogined }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);