import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllProducts, verifyToken } from '../Services/RequestAPI';
import ProductCard from './ProductCard';
import CheckoutButtonValue from './CheckoutButtonValue';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let userData;
    (async () => {
      userData = localStorage.getItem('user');
      if (!userData) {
        history.push('/login');
      } else {
        userData = JSON.parse(userData);
        const { data: dt } = await verifyToken(userData.token);
        if (dt.statusCode) {
          history.push('/login');
        }
      }

      const { data } = await getAllProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <main>
      { products.length > 0 && products.map((product, i) => (
        <ProductCard product={ product } key={ `prod-${i}` } />
      ))}
      <CheckoutButtonValue />
    </main>
  );
}
