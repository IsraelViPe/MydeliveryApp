import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const value = useMemo(() => ({
    cart,
    setCart,
  }), [cart, setCart]);

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
