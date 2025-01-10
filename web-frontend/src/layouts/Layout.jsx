import React from 'react';
import AppNavbar from '../components/AppNavbar';
import Footer from '../components/Footer';

const Layout = ( {children, cartCount} ) => {

    return (
        <div className='flex flex-col min-h-screen'>
            <AppNavbar cartCount={cartCount} />
            <div className='container mx-auto flex-1'>
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout