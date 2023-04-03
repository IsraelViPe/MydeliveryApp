import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import CartContext from '../context/CartContext';

function ProductCard(props) {
  const { setCart } = useContext(CartContext);
  const [qtyProducts, setQtyProducts] = useState({});

  function addProduct({ target: { name, dataset } }) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    setQtyProducts({
      ...qtyProducts,
      [name]: qtyProducts[name] + 1,
    });

    const newCart = {
      ...cart,
      [dataset.productid]: {
        id: dataset.productid,
        name,
        quantity: qtyProducts[name] + 1,
        unitPrice: dataset.productprice,
        subTotal: (Number(dataset.productprice) * (qtyProducts[name] + 1)),
      },
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }

  function subProduct({ target: { name, dataset } }) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    setQtyProducts({
      ...qtyProducts,
      [name]: qtyProducts[name] === 0 ? 0 : qtyProducts[name] - 1,
    });

    const newCart = {
      ...cart,
      [dataset.productid]: {
        id: dataset.productid,
        name,
        quantity: qtyProducts[name] === 0 ? 0 : qtyProducts[name] - 1,
        unitPrice: dataset.productprice,
        subTotal: (Number(dataset.productprice) * (qtyProducts[name] - 1)),
      },
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }

  function inputQty({ target: { name, value, dataset } }) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    setQtyProducts({
      ...qtyProducts,
      [name]: value,
    });

    const newCart = {
      ...cart,
      [dataset.productid]: {
        name,
        quantity: value,
        unitPrice: dataset.unitprice,
        subTotal: (Number(dataset.unitprice) * value),
      },
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }

  const { product } = props;
  return (
    <div>
      <div key={ product.id }>
        <p
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          {(product.price).replace(/\./, ',')}
        </p>

        <img
          src={ product.urlImage }
          alt={ product.name }
          width="100px"
          height="100px"
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        />

        <p
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          {product.name}
        </p>

        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          name={ product.name }
          data-productid={ product.id }
          data-productprice={ product.price }
          onClick={ addProduct }
        >
          +
        </button>

        <input
          type="number"
          min="0"
          onChange={ inputQty }
          name={ product.name }
          data-productid={ product.id }
          data-unitprice={ product.price }
          value={ qtyProducts[product.name] || 0 }
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
        />

        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          name={ product.name }
          data-productid={ product.id }
          data-unitprice={ product.price }
          onClick={ subProduct }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    urlImage: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }),
}.isRequired;

export default ProductCard;
