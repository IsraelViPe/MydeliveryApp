import PropTypes from 'prop-types';

export default function OrderCard(props) {
  const { order, role } = props;
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

  const prefixDataTestId = () => {
    if (role === 'customer') {
      return 'customer_orders__element-';
    }

    if (role === 'seller') {
      return 'seller_orders__element-';
    }
  };

  return (
    <div key={ id }>
      <p data-testid={ `${prefixDataTestId()}order-id-${id}` }>
        {`Pedido ${id}`}
      </p>
      <p data-testid={ `${prefixDataTestId()}delivery-status-${id}` }>
        { status }
      </p>
      <p data-testid={ `${prefixDataTestId()}order-date-${id}` }>
        { dataFormated }
      </p>
      <p data-testid={ `${prefixDataTestId()}card-price-${id}` }>
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
