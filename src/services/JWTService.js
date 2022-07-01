const _setToken = (data) => {
  localStorage.setItem('token', data);
};

const getToken = () => {
  const token = localStorage.getItem('token');
  console.log({ token });
  return token;
};
const _destroyToken = () => {
  console.trace();
  localStorage.removeItem('token');
};
const JWTService = { _setToken, getToken, _destroyToken };

export default JWTService;
