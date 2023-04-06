import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrderCard from './OrderCard';

export default function CostumerOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const { id } = userData;
    const getOrders = getOrderById(id);
    setOrders(getOrders);
  });

  return (
    <div>
      { orders.length > 0 && orders.map((order, i) => (
        <button
          type="button"
          onClick={ () => history.push(`/customer/orders/${order.id}`) }
          key={ `order-${i}` }
        >
          <OrderCard order={ order } key={ `order-${i}` } />
        </button>
      ))}
    </div>
  );
}
