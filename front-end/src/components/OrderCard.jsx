import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import OrderContext from '../context/OrderContext';

export default function OrderCard(props) {
  const { order } = props;
  const { setOrder } = useContext(OrderContext);

  useEffect(() => {
  });

  return (
    <div key={ order.id }>
      <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
        {`Pedido ${order.id}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
        { order.status }
      </p>
      <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
        { order.date }
      </p>
      <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
        { order.subTotal }
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.date,
    subTotal: PropTypes.number,
  }),
}.isRequired;
