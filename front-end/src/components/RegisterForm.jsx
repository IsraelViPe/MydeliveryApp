import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const MIN_CHAR = 6;
const NAME_CHAR = 12;

export default function Register() {
  const [passwordDisable, setPasswordDisable] = useState(true);
  const [emailDisable, setEmailDisable] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [nameDisable, setNameDisable] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [redirect, setRedirect] = useState(false);

  const isButtonActive = () => {
    if (passwordDisable === false && emailDisable === false && nameDisable === false) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  const handleClick = () => {
    setRedirect(true);
  };

  const passwordValidation = ({ target }) => {
    if (target.value.length > MIN_CHAR) {
      setPasswordDisable(false);
    } else {
      setPasswordDisable(true);
    }
    isButtonActive();
  };

  const nameValidation = ({ target }) => {
    setName(target.value);
    if (target.value < NAME_CHAR) {
      setNameDisable(true);
    } else {
      setNameDisable(false);
    }
    isButtonActive();
  };

  const emailValidation = ({ target }) => {
    setEmail(target.value);
    if (target.value.match(/^[^\s@]+@[^\s@]+\.com$/)) {
      setEmailDisable(false);
    } else {
      setEmailDisable(true);
    }
    isButtonActive();
  };

  // register = (name, email, password) => {
  //   fetch("http://localhost:3306/register", { method: 'POST' })
  //   .then(response => {
  //     if(response.ok) {

  //     }
  //   })
  // }

  return (
    <section className="page-login">

      <div className="container-login">
        <h2>Cadastro</h2>
        <form action="" className="form-register">
          <label htmlFor="nome-input" className="label-login">
            {' Nome '}
            <input
              id="nome-input"
              type="text"
              data-testid="common_register__input-name"
              className="input-login inputNome"
              placeholder="Seu Nome"
              value={ name }
              onKeyUp={ nameValidation }
              onChange={ nameValidation }
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
              onKeyUp={ emailValidation }
              onChange={ emailValidation }
            />
          </label>
          <label htmlFor="password-input" className="label-login">
            {' Senha '}
            <input
              id="password-input"
              type="password"
              data-testid="common_register__input-password"
              className="input-login inputPassWord"
              placeholder="Password"
              onChange={ passwordValidation }
              onKeyUp={ passwordValidation }
            />
          </label>
        </form>

        <div className="btn">
          <button
            type="button"
            data-testid="common_register__button-register"
            className="btn-login"
            disabled={ buttonDisable }
            onClick={ handleClick }
          >
            Enter
          </button>
        </div>
        {redirect && <Redirect to="/customer/products" />}

      </div>

    </section>
  );
}
