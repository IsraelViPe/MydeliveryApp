import PropTypes from 'prop-types';

export default function OrderCard(props) {
  const { order } = props;
  const { id, status, saleDate, totalPrice } = order;

  const NOVE = 9;

  function adicionaZero(numero) {
    if (numero <= NOVE) return `0${numero}`;
    return numero;
  }

  const newDate = new Date(saleDate);
  const dataFormated = `${adicionaZero(newDate.getDate())}/${adicionaZero(newDate
    .getMonth() + 1)}/${newDate.getFullYear()}`;

  const formatPrice = (totalPrice).replace(/\./, ',');

  return (
    <div key={ id }>
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </p>
      <p data-testid={ `customer_orders__element-order-date-${id}` }>
        { dataFormated }
      </p>
      <p data-testid={ `customer_orders__element-card-price-${id}` }>
        { formatPrice }
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.date,
    subTotal: PropTypes.number,
  }),
}.isRequired;
