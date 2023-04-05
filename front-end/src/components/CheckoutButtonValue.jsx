import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { getCart } from '../utils/localstorage';

function CheckoutButtonValue() {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  function getTotal() {
    const shopCart = getCart();
    let sum = shopCart.reduce((acc, item) => {
      acc += Number(item.subTotal);
      return acc;
    }, 0);

    sum = String(sum.toFixed(2)).replace('.', ',');
    setTotal(sum);
  }

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <div
      data-testid="customer_products__checkout-bottom-value"
    >
      <button
        disabled={ total === '0,00' }
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
      >
        { total }
      </button>
    </div>
  );
}

export default CheckoutButtonValue;
