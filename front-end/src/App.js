import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import Register from './pages/Register/Register';
import './App.css';
import Login from './pages/Login/Login';

export default function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Route exact path="/register" component={ Register } />
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route exact path="/login" component={ Login } />
      </Switch>
    </DeliveryProvider>
  );
}
