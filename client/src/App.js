import React from 'react';
import './App.css';
import Chatbot from './Pages/Chatbot';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';
import ProtectedRoutes from './Services/ProtectedRoutes';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* Public Routes */}
      <Route path ="/auth" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoutes />}>
          {/* Home Page */}
          <Route index element={<HomePage />} />
          {/* Chatbot Page */}
          <Route path="/chatbot" element={<Chatbot />} />
      </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
