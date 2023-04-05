import PropTypes from 'prop-types';
import { useContext } from 'react';
import { getCart } from '../utils/localstorage';
import CartContext from '../context/CartContext';

function ProductSetQty({ product }) {
  const { setCart } = useContext(CartContext);

  function upCart(quantity) {
    const { id, name, price } = product;
    let updatedCart;
    const shopCart = getCart();
    if (quantity === 0) {
      updatedCart = shopCart.filter((item) => +item.id !== +product.id);
    } else {
      const NOT_FOUND = -1;
      const indexItem = shopCart.findIndex((item) => +item.id === +product.id);
      if (indexItem !== NOT_FOUND) {
        shopCart[indexItem].quantity = quantity;
        shopCart[indexItem].subTotal = (+price * quantity).toFixed(2);
        updatedCart = shopCart;
      } else {
        shopCart.push({
          id,
          name,
          price,
          quantity,
          subTotal: (+price * quantity).toFixed(2) });
        updatedCart = shopCart;
      }
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  }

  function inc() {
    const inputQuant = document.querySelector(`input[data-productid="${product.id}"]`);
    inputQuant.value = +inputQuant.value + 1;
    const quantity = +inputQuant.value;
    upCart(quantity);
  }

  function dec() {
    const inputQuant = document.querySelector(`input[data-productid="${product.id}"]`);
    if (+inputQuant.value <= 1) {
      inputQuant.value = 0;
    } else {
      inputQuant.value = +inputQuant.value - 1;
    }

    const quantity = +inputQuant.value;
    upCart(quantity);
  }

  return (
    <div style={ { display: 'flex', alignItems: 'center', height: '100%' } }>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        name={ product.name }
        data-productid={ product.id }
        data-unitprice={ product.price }
        onClick={ inc }
      >
        +
      </button>

      <input
        type="number"
        min={ 0 }
        onChange={ ({ target: { value } }) => upCart(+value) }
        value={ undefined }
        defaultValue={ 0 }
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
        onClick={ dec }
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
