import React from 'react';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

const Layout = ( {children} ) => {

    return (
        <div className='flex flex-col min-h-screen'>
            <AppNavbar />
            <div className='container mx-auto flex-1'>
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout