import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

/* Create the AppContext with an initial value of undefined */
const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {

/* State for toast messages */
const [toast, setToast] = useState(undefined);

/* Function to show a toast message */
const showToast = (toastMessage) => {
    setToast(toastMessage);
};

return (
    <AppContext.Provider
        value={{
            showToast,
        }}
    >
        {/* Render the toast component if a toast message is present */}
        {toast && (
            <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(undefined)}
            />
        )}
        {children}
    </AppContext.Provider>
    );
};

/* Custom hook to use the AppContext */
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
};
