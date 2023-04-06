import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';
// import Cart from './Cart';
import { totalValue } from '../utils/localstorage';

export default function OrderDetailsComp() {
  const { totalCart, newValue } = useContext(CartContext);
  const [order, setOrder] = useState();

  const prefix = 'customer_order_details__';
  const { id: idOrder } = useParams();
  console.log(idOrder);

  const updateStatus = () => 'atualiza status no banco';

  useEffect(() => {
    newValue(totalValue());
    const getOrderById = (id) => ({
      id,
      totalPrice: 35.98,
      saleDate: '2023-04-06T01:05:16.798Z',
      status: 'pendente',
      seller: {
        id: 1,
        name: 'Fulana Pereira',
      },
      products: [
        {
          id: 1,
          name: 'Skol Lata 250ml',
          price: '2.20',
          quantity: 4,
          subTotal: '8.80',
        },
        {
          id: 2,
          name: 'Heineken 600ml',
          price: '7.50',
          quantity: 3,
          subTotal: '22.50',
        },
        {
          id: 3,
          name: 'Antarctica Pilsen 300ml',
          price: '2.49',
          quantity: 1,
          subTotal: '2.49',
        },
        {
          id: 5,
          name: 'Skol 269ml',
          price: '2.19',
          quantity: 1,
          subTotal: '2.19',
        },
      ],
    });
    const response = getOrderById(idOrder);
    console.log(response);
    setOrder(response);
  }, []);

  console.log(order);

  return (
    <div>
      <div>
        <h3>Detalhe do Pedido </h3>
      </div>
      <div>
        <table>
          <th data-testid={ `${prefix}element-order-details-label-order-id` }>
            Pedido
            {' '}
            { order?.id }
          </th>
          <th data-testid={ `${prefix}element-order-details-label-seller-name` }>
            {order?.seller.name}
          </th>
          <th data-testid={ `${prefix}element-order-details-label-order-date` }>
            {order?.saleDate}
          </th>
          <th
            ata-testid={
              `${prefix}element-order-details-label-delivery-status<index>`
            }
          >
            {order?.status}
          </th>
          <th>
            <button
              data-testid={ `${prefix}button-delivery-check` }
              type="button"
              onClick={ updateStatus }
            >
              MARCAR COMO ENTREGUE
            </button>
          </th>
          <tbody>
            {/* { cart.map((item, i) => (
              <Cart
                key={ i }
                item={ item }
                id={ i }
                prefix={ prefix }
              />))} */}
          </tbody>
        </table>
        <button type="button">
          TOTAL: R$
          {' '}
          <span data-testid={ `${prefix}element-order-total-price` }>{totalCart}</span>
        </button>
      </div>
    </div>
  );
}
