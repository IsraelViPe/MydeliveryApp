import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledLogin, setDisabledLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const lengthMinPass = 6;
    const isEmailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
    const isPasswordValid = password.length >= lengthMinPass;

    if (isEmailValid && isPasswordValid) {
      setDisabledLogin(false);
    } else setDisabledLogin(true);
  }, [email, password]);

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          id="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          data-testid="common_login__input-password"
        />
        <button
          disabled={ disabledLogin }
          type="button"
          data-testid="common_login__button-login"
          onClick={ () => {} }
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
