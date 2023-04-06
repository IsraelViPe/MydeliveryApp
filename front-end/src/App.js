import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import Register from './pages/Register/Register';
import './App.css';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Checkout from './pages/CustomerCheckout/Checkout';
import Orders from './pages/Orders/Orders';
import CartProvider from './context/CartProvider';

export default function App() {
  return (
    <DeliveryProvider>
      <CartProvider>
        <Switch>
          <Route exact path="/register" component={ Register } />
          <Route exact path="/" render={ () => <Redirect to="/login" /> } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/orders" component={ Orders } />
        </Switch>
      </CartProvider>
    </DeliveryProvider>
  );
}
