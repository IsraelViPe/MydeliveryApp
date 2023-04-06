import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { getCart, totalValue } from '../utils/localstorage';

export default function Cart(props) {
  const { item, id } = props;

  const prefix = 'customer_checkout__';

  const history = useHistory();
  const { cart, newCart, newValue } = useContext(CartContext);

  const [checkout, setCheckout] = useState(false);

  const removeItem = () => {
    const newCartItens = cart.filter((itemCart) => itemCart.id !== item.id);
    newCart(newCartItens);
    localStorage.setItem('cart', JSON.stringify(newCartItens));
    newValue(totalValue());
  };

  const removeButton = (
    <button
      type="button"
      data-testid={ `${prefix}element-order-table-remove-${id}` }
      onClick={ removeItem }
    >
      Remover
    </button>
  );

  useEffect(() => {
    if (history.location.pathname === '/customer/checkout') setCheckout(true);
    newCart(getCart());
  }, []);

  return (
    <tr>
      <td
        data-testid={ `${prefix}element-order-table-item-number-${id}` }
      >
        {id + 1}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-name-${id}` }
      >
        {item.name}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-quantity-${id}` }
      >
        {item.quantity}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-unit-price-${id}` }
      >
        {(item.price).replace(/\./, ',')}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-sub-total-${id}` }
      >
        {(item.subTotal).replace(/\./, ',')}
      </td>
      {checkout ? removeButton : null}
      <td />
    </tr>
  );
}

Cart.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  unitPrice: PropTypes.number,
  subTotal: PropTypes.number,
}.isRequired;
