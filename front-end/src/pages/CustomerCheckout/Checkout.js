import React from 'react';
import NavBar from '../../components/NavBar';
import CustomerCheckout from '../../components/CustomerCheckout';

export default function Checkout() {
  return (
    <section className="page-customer-checkout">
      <div className="container-navbar">
        <NavBar />
      </div>
      <div className="container-check-order">
        <CustomerCheckout />
      </div>
    </section>
  );
}
