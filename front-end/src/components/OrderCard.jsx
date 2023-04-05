import PropTypes from 'prop-types';

export default function OrderCard(props) {
  const { order } = props;

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
        { order.totalPrice }
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
