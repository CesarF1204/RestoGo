import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddToCart from './Item/AddToCart';
// import LogOutButton from './User/LogOutButton';
import SignInButton from './User/SignInButton';

const AppNavbar = ({ cartCount }) => {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);
    const sidebarRef = useRef(null);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    /* Close sidebar automatically when clicking outside the sidebar */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isNavbarCollapsed) {
                setIsNavbarCollapsed(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNavbarCollapsed]);

    return (
        <nav className="bg-gray-900 p-4 shadow-md sticky top-0 z-10 h-20">
            <div className="container mx-auto flex justify-between items-center">
                {/* Left Section: Header and Links */}
                <div className="flex items-center space-x-4">
                <Link to="/" className="text-white text-2xl font-bold flex items-center">
                    RestoGo
                </Link>
                    <div className="hidden lg:flex space-x-4">
                        <Link 
                            to="/" 
                            className={`px-4 py-2 rounded whitespace-nowrap ${
                                isActive('/') ? 'bg-gray-700 text-gray-300' : 'text-white hover:bg-gray-800'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/create_item" 
                            className={`px-4 py-2 rounded whitespace-nowrap ${
                                isActive('/create_item') ? 'bg-gray-700 text-gray-300' : 'text-white hover:bg-gray-800'
                            }`}
                        >
                            Create Item
                        </Link>
                    </div>
                </div>
                
                {/* Right Section: Burger Icon */}
                <div className="flex items-center space-x-4 lg:hidden">
                    <AddToCart cartCount={cartCount} />
                    <button 
                        className="text-white" 
                        onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {/* Right Section: Notifications and Logout for large screens */}
                <div className="hidden lg:flex items-center space-x-4">
                    <AddToCart cartCount={cartCount} />
                    <SignInButton />
                </div>
            </div>

            {/* Sidebar (Mobile) */}
            <div 
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg transform ${
                    isNavbarCollapsed ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
                <button 
                    className="text-white absolute top-4 right-4" 
                    onClick={() => setIsNavbarCollapsed(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="mt-16 flex flex-col space-y-4 px-6">
                    <Link 
                        to="/" 
                        className={`px-4 py-2 rounded ${
                            isActive('/') ? 'bg-gray-700 text-gray-300' : 'text-white hover:bg-gray-700'
                        }`}
                        onClick={() => setIsNavbarCollapsed(false)}
                    >
                        Home
                    </Link>
                    
                    <Link 
                        to="/create_item" 
                        className={`px-4 py-2 rounded ${
                            isActive('/create_item') ? 'bg-gray-700 text-gray-300' : 'text-white hover:bg-gray-700'
                        }`}
                        onClick={() => setIsNavbarCollapsed(false)}
                    >
                        Create Item
                    </Link>
                    <SignInButton 
                        className="px-4 py-2 rounded text-white hover:bg-gray-700"
                        onClick={() => setIsNavbarCollapsed(false)}
                    />
                </div>
            </div>
        </nav> 
    );
};

export default AppNavbar;