import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Layout  from './layouts/Layout';
import CreateItem from './pages/CreateItem';
import EditItem from './pages/EditItem';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout> <Home /> </Layout>} />
        <Route path="/create_item" element={ <Layout> <CreateItem /> </Layout>} />
        <Route path="/edit_item/:id" element={ <Layout> <EditItem /> </Layout>} />
      </Routes>
    </Router>
  )
}

export default App
