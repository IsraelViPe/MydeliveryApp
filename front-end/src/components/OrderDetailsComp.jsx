import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Cart from './Cart';
import { totalValue } from '../utils/localstorage';
import { updateOrderStatus, getOrderDetailById } from '../Services/RequestAPI';
import ErrorMessage from './ErrorMessage';

export default function OrderDetailsComp() {
  const { totalCart, newValue } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const prefix = 'customer_order_details__';
  const { id: idOrder } = useParams();
  const { token } = JSON.parse(localStorage.getItem('user'));

  const updateStatus = async () => {
    try {
      setErrorMsg(null);
      const { data } = await updateOrderStatus(idOrder, { status: 'Entregue' }, token);
      setOrder((prevOrder) => ({ ...prevOrder, status: data.status }));
    } catch (e) {
      setIsLoading(false);
      const { response } = e;
      setErrorMsg(response?.data.message);
    }
  };

  useEffect(() => {
    newValue(totalValue());
    async function fetchData() {
      const { data } = await getOrderDetailById(idOrder, token);
      setOrder(data);
    }
    try {
      fetchData();
      setErrorMsg(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const { response } = e;
      setErrorMsg(response?.data.message);
    }
  }, []);

  return (
    <div>
      <div>
        <h3>Detalhe do Pedido </h3>
      </div>
      {isLoading && <span>Carregando...</span>}
      { !isLoading && (
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
              { order?.products.map((item, i) => (
                <Cart
                  key={ i }
                  item={ item }
                  id={ i }
                  prefix={ prefix }
                />))}
            </tbody>
          </table>
          <button type="button">
            TOTAL: R$
            {' '}
            <span data-testid={ `${prefix}element-order-total-price` }>{totalCart}</span>
          </button>
        </div>
      )}
      { errorMsg && <ErrorMessage ErrorMsg={ errorMsg } /> }
    </div>
  );
}
