import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import OrderCard from './OrderCard';
import { getOrdersBySellerId } from '../Services/RequestAPI';

export default function SellerOrders() {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const { role } = userData;

  useEffect(() => {
    const { token } = userData;

    async function fetchData() {
      const { data } = await getOrdersBySellerId(token);
      setOrders(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      { orders.length > 0 && orders.map((order, i) => (
        <button
          type="button"
          onClick={ () => history.push(`/seller/orders/${order.id}`) }
          key={ `order-${i}` }
        >
          <OrderCard order={ order } role={ role } key={ `order-${i}` } />
          <p>{ `${order.deliveryAddress},${order.deliveryNumber}` }</p>
        </button>
      ))}
      { orders.length === 0 && (<h4>Não há pedidos</h4>) }
    </div>
  );
}
