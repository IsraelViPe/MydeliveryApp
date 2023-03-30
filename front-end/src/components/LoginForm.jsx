import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import postLogin from '../Services/RequestAPI';
import ErrorMessage from './ErrorMessage';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loginError, setLoginError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const isEmailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
    const isPasswordValid = (password.length >= MIN_PASS_LENGTH);

    if (isEmailValid && isPasswordValid) {
      setDisabledLogin(false);
    } else setDisabledLogin(true);
  }, [email, password]);

  async function handleLogin() {
    try {
      setLoginError(false);
      const { data } = await postLogin({ email, password });
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      }));

      switch (data.role) {
      case 'costumer':
        history.push('/customer/orders');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administator':
        history.push('/admin/manage');
        break;
      default:
        history.push('/login');
      }
    } catch (error) {
      const { message } = error;
      setLoginError(true);
      setErrorMsg(message);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Usuário:
          <input
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="common_login__input-email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="common_login__input-password"
          />
        </label>
        <button
          disabled={ disabledLogin }
          type="button"
          data-testid="common_login__button-login"
          onClick={ handleLogin }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => history.push('/register') }
        >
          Cadastrar
        </button>
        { loginError && (
          <ErrorMessage
            ErrorMsg={ errorMsg }
            dataTestid="common_login__element-invalid-email"
          />
        ) }
      </form>
    </div>
  );
}
