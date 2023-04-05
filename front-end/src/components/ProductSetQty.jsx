import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getCart } from '../utils/localstorage';
import CartContext from '../context/CartContext';

function ProductSetQty({ product }) {
  const { setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = getCart();
    setCart(cart);
    const itemCart = cart.find((item) => +item.id === +product.id);
    if (itemCart) setQuantity(itemCart.quantity);
  }, []);

  useEffect(() => {
    const cart = getCart();
    if (quantity === 0) {
      const newCart = cart.filter((item) => +item.id !== +product.id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCart(newCart);
    } else {
      const NOT_FOUND = -1;
      const hasItem = cart.findIndex((item) => +item.id === +product.id);
      if (hasItem !== NOT_FOUND) {
        cart[hasItem].quantity = +quantity;
        cart[hasItem].subTotal = (cart[hasItem].quantity * +product.price).toFixed(2);
      } else {
        const { id, name, price } = product;
        cart.push(
          { id, name, price, quantity, subTotal: (+price * +quantity).toFixed(2) },
        );
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      setCart(cart);
    }
  }, [quantity]);

  return (
    <div style={ { display: 'flex', alignItems: 'center', height: '100%' } }>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        onClick={ () => { setQuantity(+quantity + 1); } }
      >
        +
      </button>

      <input
        onChange={ () => {} }
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        data-productid={ product.id }
        data-unitprice={ product.price }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        onClick={ () => { if (+quantity > 0) setQuantity(+quantity - 1); } }
      >
        -
      </button>
    </div>
  );
}

ProductSetQty.propTypes = {
  product: PropTypes.shape({}),
}.isRequired;

export default ProductSetQty;
