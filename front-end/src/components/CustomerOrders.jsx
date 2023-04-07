import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrderCard from './OrderCard';
import { getOrderById } from '../Services/RequestAPI';

export default function CostumerOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));

  useEffect(async () => {
    const { token } = userData;
    const { data } = await getOrderById(token);
    setOrders(data);
    console.log(data);
  }, []);

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
      { orders.length === 0 && (<h4>Não há pedidos</h4>) }
    </div>
  );
}
