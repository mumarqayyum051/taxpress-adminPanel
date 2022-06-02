import axios from '../axios';

export const _get = async (path) => {
  const response = await axios.get(`${path}`);
  return response;
};

export const _post = async (path, body) => {
  const response = await axios.post(`${path}`, body);
  return response;
};

export const _put = async (path, body) => {
  const response = await axios.put(`${path}`, body);
  return response;
};

export const _delete = async (path) => {
  const response = await axios.delete(`${path}`);
  return response;
};
