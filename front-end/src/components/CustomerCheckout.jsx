import React, { useEffect, useState } from 'react';
import Cart from './Cart';

export default function CustomerCheckout() {
  const [itens] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itens));
  }, [itens]);

  const arrItens = Object.values(itens);

  // const removeItem = (id) => {
  //   setItens(itens.filter((target) => target.id !== id));
  // };

  return (
    <div>
      <div className="container-check-order">
        <h3>Finalizar Pedido</h3>
        colocar pedidos aqui
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
            { arrItens.map((item, i) => (
              <Cart
                key={ `prod-${i}` }
                index={ i + 1 }
                name={ item.name }
                quantity={ item.quantity }
                unitPrice={ item.unitPrice }
                subTotal={ item.subTotal }
              />))}
          </tbody>
        </table>
        <div className="btn">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            className="btn-fin-pedido"
            // onClick={ handleClick }
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
