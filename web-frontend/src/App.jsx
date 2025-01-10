import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout  from './layouts/Layout';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem';
import SignIn from './pages/SignIn';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout cartCount={cartCount}> <Home setCartCount={setCartCount} /> </Layout>} />
        <Route path="/create_item" element={ <Layout> <CreateItem /> </Layout>} />
        <Route path="/edit_item/:id" element={ <Layout> <EditItem /> </Layout>} />
        <Route path="/sign_in" element={ <Layout> <SignIn /> </Layout>} />
        
        {/* Fallback to home for undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
