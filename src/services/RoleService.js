import { _post, _get, _delete } from './HttpService';

const _addRole = (roleData) => {
  return _post('/userCreation', roleData);
};
const _getRoles = () => _get('/userCreation');

const _deleteRole = (id) => _delete(`/userCreation/${id}`);

const RoleService = {
  _addRole,
  _getRoles,
  _deleteRole,
};

export default RoleService;
