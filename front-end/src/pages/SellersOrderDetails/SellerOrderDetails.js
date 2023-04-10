import React from 'react';
import NavBar from '../../components/NavBar';
import OrderDetailsComp from '../../components/OrderDetailsComp';

export default function SellerOrderDetails() {
  const prefixSeller = 'seller_order_details__';

  return (
    <div>
      <NavBar />
      <OrderDetailsComp prefix={ prefixSeller } />
    </div>
  );
}
