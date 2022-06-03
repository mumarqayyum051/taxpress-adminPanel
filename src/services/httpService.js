import axios from 'axios';

const baseURL = 'https://taxpress.api.quantux.net/api';
const headersConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const _get = async (path) => {
  const response = await axios.get(`${baseURL}${path}`, {
    headers: headersConfig,
  });
  return response;
};

export const _post = async (path, body) => {
  const response = await axios.post(`${baseURL}${path}`, body, {
    headers: headersConfig,
  });
  return response;
};

export const _put = async (path, body) => {
  const response = await axios.put(`${baseURL}${path}`, body, {
    headers: headersConfig,
  });
  return response;
};

export const _delete = async (path) => {
  const response = await axios.delete(`${baseURL}${path}`, {
    headers: headersConfig,
  });
  return response;
};
