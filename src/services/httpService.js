import axios from '../axios';

const baseURL = 'http://localhost:4000/api';
const headersConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const _get = async (path) => {
  const response = await axios.get(`${path}`, {
    headers: headersConfig,
  });
  return response;
};

export const _post = async (path, body) => {
  const response = await axios.post(`${path}`, body, {
    headers: headersConfig,
  });
  return response;
};

export const _put = async (path, body) => {
  const response = await axios.put(`${path}`, body, {
    headers: headersConfig,
  });
  return response;
};

export const _delete = async (path) => {
  const response = await axios.delete(`${path}`, {
    headers: headersConfig,
  });
  return response;
};
