export const getCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

export const initCart = () => {
  const cart = localStorage.getItem('cart');
  if (!cart) localStorage.setItem('cart', JSON.stringify([]));
};

export const totalValue = () => {
  const cart = getCart();
  if (cart.length === 0) {
    return 0;
  }

  const totalVal = cart.reduce((acc, item) => {
    acc += +item.subTotal;
    return acc;
  }, 0);
  return totalVal.toFixed(2).replace('.', ',');
};
