const setToken = (data) => {
  localStorage.setItem('token', data);
};

const getToken = () => {
  localStorage.getItem('token');
};
const destroyToken = () => {
  localStorage.removeItem('token');
};
const JWTService = { setToken, getToken, destroyToken };

export default JWTService;
