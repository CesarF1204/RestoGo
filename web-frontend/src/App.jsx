import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './contexts/AppContext';
import Home from './pages/Home';
import Layout  from './layouts/Layout';
import CreateItem from './pages/Item/CreateItem';
import EditItem from './pages/Item/EditItem';
import SignIn from './pages/User/SignIn';
import Register from './pages/User/Register';
import ForgotPassword from './pages/User/ForgotPassword';

function App() {
  const { isLoggedIn, userData } =  useAppContext();
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout cartCount={cartCount} setCartCount={setCartCount}> <Home setCartCount={setCartCount} /> </Layout>} />
        {/* Redirect to home page if logged in, otherwise redirect to sign in page */}
        <Route path="/sign_in" element={isLoggedIn ? <Navigate to="/" /> : <Layout> <SignIn /> </Layout>} />
        {/* Redirect to home page if logged in, otherwise redirect to registration page */}
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Layout> <Register /> </Layout>} />
        {/* Redirect to home page if logged in, otherwise redirect to forgot password page */}
        <Route path="/forgot_password" element={isLoggedIn ? <Navigate to="/" /> : <Layout> <ForgotPassword /> </Layout>} />

        {/* Protected routes */}
        <Route path="/create_item" element={isLoggedIn && userData?.user?.role === 'admin'
          ? <Layout> <CreateItem /> </Layout>
          : <Navigate to="/" />} 
        />
        <Route path="/edit_item/:id" element={isLoggedIn && userData?.user?.role === 'admin'
          ? <Layout> <EditItem /> </Layout>
          : <Navigate to="/" />} 
        />

        {/* Fallback to home page for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
