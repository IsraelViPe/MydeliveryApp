import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import Register from './pages/Register/Register';

import './App.css';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Route exact path="/register" component={ Register } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
