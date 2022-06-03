import { _post, _get } from './HttpService';

const _login = (data) => _post('/users/admin/login', data);
const _userContext = () => _get('/users/userContext');
const AuthService = {
  _login,
  _userContext,
};

export default AuthService;
