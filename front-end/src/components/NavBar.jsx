import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const [userName, setUserName] = useState('');
  const [navTitle, setNavTitle] = useState('');
  const [role, setRole] = useState(undefined);

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      history.push('/login');
    }

    setUserName(user.name);

    if (user.role === 'customer') {
      setRole(user.role);
    }

    switch (user.role) {
    case ('administrator'):
      setNavTitle('Gerenciar Usuários');
      break;
    case ('seller'):
      setNavTitle('Pedidos');
      break;
    default:
      setNavTitle('Produtos');
    }
  }, []);

  const buttonLogout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <nav>
      <h2 data-testid="customer_products__element-navbar-link-products">{navTitle}</h2>
      {
        role && (
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => history.push('customer/orders') }
          >
            Meus Pedidos
          </button>
        )
      }
      <h2 data-testid="customer_products__element-navbar-user-full-name">{userName}</h2>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ buttonLogout }
      >
        Sair
      </button>
    </nav>
  );
}
