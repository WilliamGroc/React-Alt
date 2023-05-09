import { createContext, useState } from "react";

export const GoalsDataContext = createContext();

export const GoalsDataProvider = ({ children }) => {
    const [goalsData, setGoalsData] = useState([]);
    return (
        <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
            {children}
        </GoalsDataContext.Provider>
    );
};
