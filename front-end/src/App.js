import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DeliveryProvider from './context/deliveryProvider';
import RegisterScreen from './pages/Register/Register';

import './App.css';

function App() {
  return (
    <DeliveryProvider>
      <Switch>
        <Route exact path="/register" component={ RegisterScreen } />
      </Switch>
    </DeliveryProvider>
  );
}

export default App;
