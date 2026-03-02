import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css'
import Sidebar from './components/Sidebar';
import FacultyList from './pages/FacultyList';
import ManagementPage from './pages/ManagementPage';
import CreateItem from './pages/CreateItem';

const Dashboard = () => <h1 className="text-3xl font-bold">Welcome, Admin</h1>;
const FacultyPage = () => <h1 className="text-3xl font-bold">Manage Faculty</h1>;

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<div className="p-10">Dashboard Overview</div>} />
            {/* This one route handles all your tables! */}
            <Route path="/manage/:type" element={<ManagementPage />} />
            <Route path="/manage/:type/create" element={<CreateItem/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
