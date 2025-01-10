import React from 'react';
import { Link } from 'react-router-dom';

const SignInButton = ({ setIsNavbarCollapsed }) => {
    return (
        <Link 
            to="/sign_in" 
            className="btn bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-blue-600"
            onClick={() => setIsNavbarCollapsed(false)}
        >
            Sign In
        </Link>
    );
};

export default SignInButton;