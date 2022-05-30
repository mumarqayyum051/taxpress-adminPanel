import { _post } from './httpService';

const _login = (data) => _post('/users/admin/login', data);

const AuthService = {
  _login,
};

export default AuthService;
