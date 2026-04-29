import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetails from './pages/ProjectDetails';

function App() {

  return (
    
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
<Route path="/project/:id" element={<ProjectDetails />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
   
  )
}

export default App
