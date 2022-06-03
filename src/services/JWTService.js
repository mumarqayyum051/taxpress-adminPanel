const _setToken = (data) => {
  localStorage.setItem('token', data);
};

const getToken = () => localStorage.getItem('token');
const _destroyToken = () => {
  localStorage.removeItem('token');
};
const JWTService = { _setToken, getToken, _destroyToken };

export default JWTService;
