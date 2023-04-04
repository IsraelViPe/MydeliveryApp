export const getCart = () => {
  const cart = localStorage.getItem('cart');
  if (!cart) return JSON.parse('[]');
  return JSON.parse(localStorage.getItem('cart'));
};

export const initCart = () => {
  const cart = localStorage.getItem('cart');
  if (!cart) localStorage.setItem('cart', JSON.stringify([]));
};
