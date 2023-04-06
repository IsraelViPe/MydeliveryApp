import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Cart from './Cart';
import { getCart, totalValue } from '../utils/localstorage';
import { getSellers, requestWithToken } from '../Services/RequestAPI';

export default function CustomerCheckout() {
  const { cart, newCart, totalCart, newValue } = useContext(CartContext);
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);

  const prefix = 'customer_checkout__';

  useEffect(() => {
    newCart(getCart());
    newValue(totalValue());

    async function fetchData() {
      const result = await getSellers();
      setSellers(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setSeller(sellers[0]);
  }, [sellers]);

  const sale = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const { id } = await requestWithToken('/sales', {
      sellerId: Number(seller.id),
      totalPrice: totalCart,
      deliveryAddress: address,
      deliveryNumber: Number(number),
      products: cart,
    }, token);
    console.log(id);
    history.push(`/customer/orders/${id}`);
  };

  const selSeller = (e) => {
    setSeller(e.target.value);
  };

  return (
    <div>
      <div className="container-check-order">
        <h3>Finalizar Pedido</h3>
      </div>
      <div className="container-details">
        <h3>Detalhes e Endereço para Entrega</h3>
        <table>
          <thead>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </thead>
          <tbody>
            { cart.map((item, i) => (
              <Cart
                key={ i }
                item={ item }
                id={ i }
              />))}
          </tbody>
        </table>
        <button type="button">
          TOTAL: R$
          {' '}
          <span data-testid={ `${prefix}element-order-total-price` }>{totalCart}</span>
        </button>
        <select
          data-testid={ `${prefix}select-seller` }
          value={ seller }
          onClick={ selSeller }
        >
          {(Object.values(sellers)).map((sellr) => (
            <option value={ sellr.id } key={ sellr.id }>{sellr.name}</option>))}
        </select>
        <input
          type="text"
          data-testid={ `${prefix}input-address` }
          value={ address }
          onChange={ (e) => setAddress(e.target.value) }
        />
        <input
          type="number"
          data-testid={ `${prefix}input-address-number` }
          value={ number }
          onChange={ (e) => setNumber(e.target.value) }
        />

        <div className="btn">
          <button
            type="button"
            data-testid={ `${prefix}button-submit-order` }
            className="btn-fin-pedido"
            onClick={ sale }
            disabled={ cart.length < 1 }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

// { /* <table>
//   <thead>
//     <tr>
//       <th>Item</th>
//       <th>Descrição</th>
//       <th>Quantidade</th>
//       <th>Valor Unitário</th>
//       <th>Sub-total</th>
//       <th>Remover Item</th>
//     </tr>
//   </thead>
//   <tbody>
//     {
//       // map no cart
//     }
//   </tbody>
// </table> */ }
