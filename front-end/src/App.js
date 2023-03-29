import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import Register from './pages/Register/Register';
import './App.css';
import Login from './Pages/Login';

export default function App() {
  return (
    <DeliveryProvider>
        <Routes>
            <Route exact path="/register" component={ Register } />
            <Route path="/" element={ <Navigate to="/login" /> } />
            <Route path="/login" element={ <Login /> } />
        </Routes>
    </DeliveryProvider>
  );
}
