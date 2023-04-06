import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Orders from './pages/Orders/Orders';
import Checkout from './pages/CustomerCheckout/Checkout';
import CartProvider from './context/CartProvider';
import './App.css';

export default function App() {
  return (
    <DeliveryProvider>
      <CartProvider>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/costumer/orders" component={ Orders } />
          <Route exact path="/customer/checkout" component={ Checkout } />
        </Switch>
      </CartProvider>
    </DeliveryProvider>
  );
}
