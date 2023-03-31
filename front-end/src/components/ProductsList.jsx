import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts } from '../Services/RequestAPI';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [qtyProducts, setQtyProducts] = useState({});
  const [total, setTotal] = useState(0);
  const [disabledCheckeout, setDisableCheckout] = useState(false);

  const history = useHistory();

  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify({}));
  }

  const checkUser = async () => {
    const { token, name } = JSON.parse(localStorage.getItem('user'));
    const { data } = await verifyToken(token);

    if (data.name !== name) {
      localStorage.removeItem('user');
      history.push('/login');
    }
  };

  const getProducts = useCallBack(async () => {
    const { data } = await getAllProducts();
    await checkUser();
    setProducts(data);
    const objProducts = data.reduce((prev, curr) => ({
      ...prev,
      [curr.name]: 0,
    }), {});
    setQtyProducts(objProducts);
  }, []);

  useEffect(() => {
    getProducts().catch(console.error);
  }, [getProducts]);

  function addPrduct({ target: { name, dataset } }) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    setQuantityProducts({
      ...quantityProducts,
      [name]: quantityProducts[name] + 1,
    });

    const newCart = {
      ...cart,
      [dataset.productid]: {
        id: dataset.productid,
        name,
        quantity: quantityProducts[name] + 1,
        unitPrice: dataset.unitprice,
        subTotal: (Number(dataset.unitprice) * (quantityProducts[name] + 1)),
      },
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  return (
    <div>
      {
        products.length > 0 && (
          products.map((product) => (
            <div key={ product.id }>
              <p
                data-testid={ `customer_products__element-card-price-${product.id}` }
              >
                { (product.price).replace(/\./, ',') }
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
                { product.name }
              </p>

              <button
                type="button"
                data-testid={ `customer_products__button-card-add-item-${product.id}` }
                name={ product.name }
                data-productid={ product.id }
                data-unitprice={ product.price }
                onClick={ addPrduct } // handleIncrement
              >
                +
              </button>

              <input
                type="number"
                min="0"
                onChange={ handleQtyProduct } // handleInputQtd
                name={ product.name }
                data-productid={ product.id }
                data-unitprice={ product.price }
                value={ quantityProducts[product.name] }
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
            </div>))
        )
      }

      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ disabledCheckout }
      >
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {`Ver Carrinho: ${String(totalValue.toFixed(2)).replace(/\./, ',')}`}
        </p>
      </button>
    </div>
  );
}
