import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts, verifyToken } from '../Services/RequestAPI';
import ProductCard from './ProductCard';

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
    await checkUser();
    const { data } = await getAllProducts();
    setProducts(data);
    const objProducts = data.reduce((prev, curr) => ({
      ...prev,
      [curr.name]: 0,
    }), {});
    setQtyProducts(objProducts);
    // console.log(objProducts);
  }, []);

  useEffect(() => {
    getProducts().catch(console.error);
  }, [getProducts]);

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
          products.map((product, i) => (
            <ProductCard
              product={ product }
              key={ `prod-${i}` }
            />))
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
          {String(total.toFixed(2)).replace(/\./, ',')}
        </p>
      </button>
    </div>
  );
}
