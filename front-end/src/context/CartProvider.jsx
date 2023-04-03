import { useMemo, useState } from 'react';
import CartContext from './CartContext';

function CartProvider() {
  const [cart, setCart] = useState([]);

  const value = useMemo(() => ({
    cart,
  }), [cart, setCart]);

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
