import { _post } from './HttpService';

const _login = (data) => _post('/users/admin/login', data);

const AuthService = {
  _login,
};

export default AuthService;
