import * as _axios from 'axios';
import environment from './environment/env';
import JWTService from './services/JWTService';

const { baseURL } = environment;
const axios = _axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axios;
