import { _post, _delete, _get } from './httpService';

const _addOrdinance = (data) => _post('/ordinance/addOrdinance', data);
const _deleteOrdinance = (id) => _delete(`/ordinance/deleteOrdinance/${id}`);
const __getAllOrdinances = () => _get('/ordinance/getAllOrdinances');
const OrdinanceService = {
  _addOrdinance,
  _deleteOrdinance,
  __getAllOrdinances,
};

export default OrdinanceService;
