import React, { createContext, useContext, useState, useEffect } from "react";
import * as apiClient from '../api-client';
import Toast from "../components/Toast";

/* Create the AppContext with an initial value of undefined */
const AppContext = createContext(undefined);

const AppContextProvider = ({ children }) => {
    /* State for toast messages */
    const [toast, setToast] = useState(undefined);
    const [userData, setUserData] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    /* Function to show a toast message */
    const showToast = (toastMessage) => {
        setToast(toastMessage);
    };

    /* Validate token when component mounts */
    useEffect(() => {
        const validateToken = async () => {
            try {
                /* Call validateToken for validating token */
                const response = await apiClient.validateToken();
                
                /* Check if response is valid */
                if(response){
                    /* Set login status to true if token is valid */
                    setIsLoggedIn(true); 
                    /* Get user data from the response and set it to userData state  */
                    setUserData(response);
                    setToken(response.token)
                }
                else{
                    /* Set login status to true if token is not valid */
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsLoggedIn(false);
            }
            finally {
                setLoading(false);
            }
        };
        validateToken();
    }, [token]);
    
    return (
        <AppContext.Provider
            value={{
                showToast,
                isLoggedIn,
                setIsLoggedIn,
                userData,
                setToken
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                children
            )}
        </AppContext.Provider>
    );
};

/* Custom hook to use the AppContext */
const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
};

export { AppContextProvider, useAppContext }