import React from 'react';
import PropTypes from 'prop-types';

export default function Cart({ index, name, quantity, unitPrice, subTotal }) {
  const prefix = 'customer_checkout__';

  return (
    <tr>
      <td
        data-testid={ `${prefix}element-order-table-item-number-${index}` }
      >
        {index}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-unit-price-${index}` }
      >
        {unitPrice}
      </td>
      <td
        data-testid={ `${prefix}element-order-table-sub-total-${index}` }
      >
        {subTotal}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `${prefix}element-order-table-remove-${index}` }
          name={ name }
          // onClick={ addProduct }
        >
          Remover
        </button>
      </td>
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
