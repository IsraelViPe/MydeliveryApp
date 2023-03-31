import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts, verifyToken } from '../Services/RequestAPI';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [qtyProducts, setQtyProducts] = useState({});
  const [total, setTotal] = useState(0);
  const [disabledCheckout, setDisableCheckout] = useState(false);

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

  const getProducts = useCallback(async () => {
    const { data } = await getAllProducts();
    console.log(data, '1');
    await checkUser();
    setProducts(data);
    const objProducts = data.reduce((prev, curr) => ({
      ...prev,
      [curr.name]: 0,
    }), {});
    setQtyProducts(objProducts);
    console.log(objProducts, '2');
  }, []);

  useEffect(() => {
    getProducts().catch(console.error);
  }, [getProducts]);

  function addPrduct({ target: { name, dataset } }) {
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
  }

  function setValue() {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const totalCart = Object.values(cart).reduce((prev, curr) => prev + curr.subTotal, 0);

    setTotal(totalCart);

    if (!totalCart) setDisableCheckout(true);
    else setDisableCheckout(false);
  }

  useEffect(() => setValue(), [qtyProducts]);

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
                data-productprice={ product.price }
                onClick={ addPrduct }
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
                value={ qtyProducts[product.name] }
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
          {`Ver Carrinho: ${String(total.toFixed(2)).replace(/\./, ',')}`}
        </p>
      </button>
    </div>
  );
}
