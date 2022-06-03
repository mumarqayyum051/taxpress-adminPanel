import * as _axios from 'axios';
import JWTService from './services/JWTService';

const baseURL = 'http://localhost:4000/api';
const axios = _axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${JWTService.getToken()}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axios;
