import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
// import CartContext from '../context/CartContext';
import OrderDetailsCard from './OrderDetailsCard';
// import { totalValue } from '../utils/localstorage';
import { updateOrderStatus, getOrderDetailById } from '../Services/RequestAPI';
import ErrorMessage from './ErrorMessage';
import formatDate from '../utils/formatDate';

export default function OrderDetailsComp({ prefix }) {
  // const { totalCart, newValue } = useContext(CartContext);
  const [totalCart, setTotalCart] = useState();
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { location: { pathname } } = useHistory();

  const { id: idOrder } = useParams();
  const { token } = JSON.parse(localStorage.getItem('user'));
  const disablePreparing = (order?.status !== 'Pendente');

  const disableDispatch = order?.status !== 'Preparando';

  const calculateTotalCart = (products) => {
    const totalVal = products.reduce((acc, item) => {
      acc += +item.subTotal;
      return acc;
    }, 0);
    return totalVal.toFixed(2).replace('.', ',');
  };

  const updateStatus = async ({ target: { id } }) => {
    const status = id;

    try {
      setErrorMsg(null);
      const { data } = await updateOrderStatus(idOrder, { status }, token);
      setOrder((prevOrder) => ({ ...prevOrder, status: data.status }));
    } catch (e) {
      setIsLoading(false);
      const { response } = e;
      setErrorMsg(response?.data.message);
    }
  };

  useEffect(() => {
    // newValue(totalValue());
    async function fetchData() {
      const { data } = await getOrderDetailById(idOrder, token);
      setOrder(data);
      setTotalCart(calculateTotalCart(data.products));
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

  console.log(order);

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
              {formatDate(order?.saleDate)}
            </th>
            <th
              data-testid={
                `${prefix}element-order-details-label-delivery-status${idOrder}`
              }
            >
              {order?.status}
            </th>
            <th>
              {pathname.includes('/customer/orders/')
              && (
                <button
                  data-testid={ `${prefix}button-delivery-check` }
                  type="button"
                  id="Entregue"
                  disabled={ order?.status !== 'Em Trânsito' }
                  onClick={ updateStatus }
                >
                  MARCAR COMO ENTREGUE
                </button>
              )}
              { pathname.includes('/seller/orders')
                && (
                  <>
                    <button
                      data-testid={ `${prefix}button-preparing-check` }
                      type="button"
                      id="Preparando"
                      disabled={ disablePreparing }
                      onClick={ updateStatus }
                    >
                      PREPARANDO PEDIDO
                    </button>
                    <button
                      data-testid={ `${prefix}button-dispatch-check` }
                      type="button"
                      disabled={ disableDispatch }
                      id="Em Trânsito"
                      onClick={ updateStatus }
                    >
                      SAIU PARA ENTREGA
                    </button>
                  </>
                ) }
            </th>
            <tbody>
              { order?.products.map((item, i) => (
                <OrderDetailsCard
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
            <span data-testid={ `${prefix}element-order-total-price` }>
              {totalCart}
            </span>
          </button>
        </div>
      )}
      { errorMsg && <ErrorMessage ErrorMsg={ errorMsg } /> }
    </div>
  );
}

OrderDetailsComp.propTypes = {
  prefix: PropTypes.string,
}.isRequired;
