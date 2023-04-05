import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [totalCart, setTotalCart] = useState(0);
  const [cart, setCart] = useState([]);

  const newCart = (attCart) => {
    setCart(attCart);
  };
  const newValue = (attValue) => {
    setTotalCart(attValue);
  };

  const value = useMemo(() => ({
    totalCart,
    newValue,
    cart,
    setCart,
    newCart,
  }), [totalCart, cart, setCart]);

  return (
    <CartContext.Provider value={ value }>
      { children }
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;

export default CartProvider;
