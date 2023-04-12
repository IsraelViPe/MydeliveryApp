import { useState, useEffect } from 'react';
import { addUser, getUserList } from '../Services/RequestAPI';
import ErrorMessage from './ErrorMessage';
import UserCard from './UserCard';

export default function AdminManagerComp() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState();
  const [password, setPassword] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const MIN_CHAR = 6;
  const NAME_CHAR = 12;
  const { token } = JSON.parse(localStorage.getItem('user'));

  const checkName = (n) => n.length >= NAME_CHAR;
  const checkPassword = (pass) => pass.length >= MIN_CHAR;
  const checkEmail = (mail) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserList(token);
      setUsers(data);
    }
    try {
      fetchData();
      setErrorMsg(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const { response } = e;
      setErrorMsg(response?.data.message);
    }
  });

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

  const loadUsers = async () => {
    try {
      const { data } = await getUserList(token);
      setUsers(data);
      setErrorMsg(null);
    } catch (error) {
      const { response } = error;
      setErrorMsg(response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async () => {
    const body = {
      name, email, password, role,
    };
    try {
      await addUser(body, token);
      setErrorMsg(null);
      await loadUsers();
    } catch (error) {
      const { response } = error;
      setErrorMsg(response.data.message);
    }
  };

  const handleDeleteUser = async ({ target: { id } }) => {
    try {
      await deleteUser(id, token);
      setErrorMsg(null);
      await loadUsers();
    } catch (error) {
      const { response } = error;
      setErrorMsg(response.data.message);
    }
  };

  return (
    <div>
      <h2>Cadastrar novo usuário</h2>
      {errorMsg && <ErrorMessage
        ErrorMsg={ errorMsg }
        dataTestId="admin_manage__element-invalid-register"
      /> }
      <form action="">
        <label htmlFor="nome-input">
          {' Nome '}
          <input
            id="nome-input"
            type="text"
            data-testid="admin_manage__input-name"
            className="input-login inputNome"
            placeholder="Nome e sobrenome"
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
        </label>
        <label htmlFor="email-input">
          {' Email '}
          <input
            id="email-input"
            type="email"
            data-testid="admin_manage__input-email"
            className="input-login inputEmail"
            placeholder="seu-email@site.com.br"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          {' Senha '}
          <input
            id="password-input"
            type="password"
            value={ password }
            data-testid="admin_manage__input-password"
            className="input-login inputPassWord"
            placeholder="Password"
            onChange={ () => setPassword(e.target.value) }
          />
        </label>
        <label htmlFor="password-input">
          {' Tipo '}
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            defaultValue="administrator"
            onChange={ (e) => setRole(e.target.value) }
          >
            <option value="administrator">administrator</option>
            <option value="seller">seller</option>
            <option value="customer">customer</option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ buttonDisable }
          onClick={ handleAddUser }
        >
          Cadastrar
        </button>
      </form>
      <table>
        <thead>
          <th>Item</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </thead>
        { !isLoading && (
          <tbody>
            { users.map((item, id) => (
              <UserCard
                key={ item.id }
                item={ item }
                id={ id }
                onClick={ handleDeleteUser }
              />
            ))}
          </tbody>
        ) }
      </table>
    </div>
  );
}
