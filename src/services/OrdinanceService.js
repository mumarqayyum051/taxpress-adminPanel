import { _post, _delete, _get } from './HttpService';

const _addOrdinance = (data) => _post('/ordinance/addOrdinance', data);
const _deleteOrdinance = (id) => _delete(`/ordinance/deleteOrdinance/${id}`);
const _getAllOrdinance = () => _get('/ordinance/getAllOrdinance');
const OrdinanceService = {
  _addOrdinance,
  _deleteOrdinance,
  _getAllOrdinance,
};

export default OrdinanceService;
