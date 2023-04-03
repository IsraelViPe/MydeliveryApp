import React from 'react';

export default function CustomerCheckout() {
  async function handleClick() {
    const body = {
      teste,
    };
    try {
      await postFinishOrder(body);
      setRegisterError(false);
    } catch (error) {
      const { response } = error;
      setRegisterError(true);
      setErrorMsg(response.data.message);
      return;
    }
    setRedirect(true);
  }

  return (
    <div>
      <div className="container-check-order">
        <h3>Finalizar Pedido</h3>
        colocar pedidos aqui
      </div>
      <div className="container-details">
        <h3>Detalhes e Endereço para Entrega</h3>
        colocar endereço e detalhes
        <div className="btn">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            className="btn-login"
            onClick={ handleClick }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
