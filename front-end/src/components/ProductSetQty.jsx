import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { getCart, initCart } from '../utils/localstorage';
import CartContext from '../context/CartContext';

function ProductSetQty({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    initCart();
  }, []);

  const setInputValor = () => {
    const it = cart.find((i) => +i.id === +product.id);
    if (it) {
      setValue(it.quantity);
      return;
    }
    setValue(0);
  };

  useEffect(() => {
    setInputValor();
  }, [cart]);

  const removeOrUpdateCart = (quantity, prodId) => {
    let updatedCart;
    const shopCart = getCart();
    if (+quantity === 0) {
      updatedCart = shopCart.filter((item) => +item.id !== +prodId);
    } else {
      updatedCart = shopCart.map((item) => {
        if (+item.id === +prodId) item.quantity = quantity;
        return item;
      });
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addOrUpdateCart = (quantity, prodId = null, newItem = null) => {
    let updatedCart;
    const cartShop = getCart();
    if (prodId) {
      updatedCart = cartShop.map((item) => {
        if (+item.id === +prodId) item.quantity = quantity;
        return item;
      });
    } else {
      cartShop.push(newItem);
      updatedCart = cartShop;
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const decQuantity = ({ target: { dataset: { productid } } }) => {
    const inputQuant = document.querySelector(`[data-productid="${productid}"]`);
    if (+inputQuant.value <= 1) {
      inputQuant.value = 0;
      removeOrUpdateCart(inputQuant.value, productid);
    } else {
      inputQuant.value = +inputQuant.value - 1;
      removeOrUpdateCart(inputQuant.value, productid);
    }
  };

  const incQuantity = ({ target: { name, dataset: { productid, unitprice } } }) => {
    const inputQuant = document.querySelector(`[data-productid="${productid}"]`);
    const crt = getCart();
    const existItem = crt.some((c) => +c.id === +productid);

    if (+inputQuant.value === 0 && !existItem) {
      inputQuant.value = +inputQuant.value + 1;
      setValue(inputQuant.value);
      addOrUpdateCart(
        inputQuant.value,
        null,
        { id: productid, name, price: unitprice, quantity: inputQuant.value },
      );
    } else {
      inputQuant.value = +inputQuant.value + 1;
      addOrUpdateCart(inputQuant.value, productid);
    }
  };

  return (
    <>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        onClick={ incQuantity }
      >
        +
      </button>

      <input
        disabled
        type="text"
        min="0"
        onChange={ () => setValue(value) }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        value={ value }
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        onClick={ decQuantity }
      >
        -
      </button>
    </>
  );
}

ProductSetQty.propTypes = {
  product: PropTypes.shape({}),
}.isRequired;

export default ProductSetQty;
