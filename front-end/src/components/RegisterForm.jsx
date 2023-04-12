import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { postRegister } from '../Services/RequestAPI';

const MIN_CHAR = 6;
const NAME_CHAR = 12;

export default function Register() {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // const [redirect, setRedirect] = useState(false);
  const [resgisterError, setRegisterError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  async function handleClick() {
    const body = {
      name,
      email,
      password,
      role: 'customer',
    };
    try {
      const { data } = await postRegister(body);
      localStorage.setItem('user', JSON.stringify({
        name: data.name,
        email: data.email,
        role: body.role,
        token: data.token,
      }));
      history.push('/customer/products');
      // setRegisterError(false);
    } catch (error) {
      const { response } = error;
      setRegisterError(true);
      setErrorMsg(response.data.message);
    }
  }

  const setInputPassword = ({ target }) => {
    setPassword(target.value);
  };

  const setInputName = ({ target }) => {
    setName(target.value);
  };

  const setInputEmail = ({ target }) => {
    setEmail(target.value);
  };

  const checkName = (n) => n.length >= NAME_CHAR;
  const checkPassword = (pass) => pass.length >= MIN_CHAR;
  const checkEmail = (mail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);

  const checkButton = () => {
    if (checkName(name) && checkPassword(password) && checkEmail(email)) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  useEffect(() => {
    checkButton();
  }, [name, password, email]);

  return (
    <form action="" className="form-register">
      <h2>Cadastro</h2>
      <label htmlFor="nome-input" className="label-login">
        {' Nome '}
        <input
          id="nome-input"
          type="text"
          data-testid="common_register__input-name"
          className="input-login inputNome"
          placeholder="Seu Nome"
          value={ name }
          onChange={ setInputName }
        />
      </label>
      <label htmlFor="email-input" className="label-login">
        {' Email '}
        <input
          id="email-input"
          type="email"
          data-testid="common_register__input-email"
          className="input-login inputEmail"
          placeholder="exemplo@exemplo"
          value={ email }
          onChange={ setInputEmail }
        />
      </label>
      <label htmlFor="password-input" className="label-login">
        {' Senha '}
        <input
          id="password-input"
          type="password"
          value={ password }
          data-testid="common_register__input-password"
          className="input-login inputPassWord"
          placeholder="Password"
          onChange={ setInputPassword }
        />
      </label>
      <div className="btn">
        <button
          type="button"
          data-testid="common_register__button-register"
          className="btn-login"
          disabled={ buttonDisable }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </div>
      {resgisterError && <ErrorMessage
        ErrorMsg={ errorMsg }
        dataTestId="common_register__element-invalid_register"
      /> }
    </form>

  );
}
