import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api-client';

const LogOutButton = ({ setCartCount, setIsNavbarCollapsed }) => {
    /* Navigate to different routes */
    const navigate = useNavigate();
    /* Extract showToast function from context */
    const { showToast } = useAppContext();

    /* Function to handle logout */
    const handleLogOut = async () => {
        try{
            /* Call logOut from api-client to sign out user */
            await apiClient.logOut();
            /* Remove auth_token from local storage */
            localStorage.removeItem('auth_token');
            /* Set the default cart count to 0 */
            setCartCount(0);
            /* Close sidebar */
            setIsNavbarCollapsed(false);
            /* Show success toast */
            showToast({ message: "Logged Out!", type: "ERROR" })
            /* Navigate to sign in */
            navigate("/sign_in");
        }
        catch(error){
            console.error('Error log out:', error);
            showToast({ message: error.message, type: "ERROR"});
        }
    }

    return (
        <button 
            onClick={handleLogOut}
            className="btn bg-red-500 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-red-600"
        >
            Log Out
        </button>
    );
};

export default LogOutButton;