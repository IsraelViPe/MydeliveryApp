import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export default async function postLogin(body) {
  const response = await api.post('/login', body);
  return response;
}

export async function postRegister(body) {
  const response = await api.post('/register', body);
  return response;
}

export async function getAllProducts() {
  const response = await api.get('/products');
  return response;
}

export async function getSellers() {
  const response = await api.get('/user/sellers');
  return response;
}

export async function postOrder(endpoint, body, token) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.post(endpoint, body, config);
  return response;
}

export async function verifyToken(token) {
  const config = {
    headers: { Authorization: token },
  };
  const response = await api.post('/tokenverify', {}, config);
  return response;
}
