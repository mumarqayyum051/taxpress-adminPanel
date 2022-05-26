import { _post, _delete, _get } from './httpService';

const _addOrdinance = (data) => _post('/ordinance/addOrdinance', data);
const _deleteOrdinance = (id) => _delete(`/ordinance/deleteOrdinance/${id}`);
const _getAllOrdinance = () => _get('/ordinance/getOrdinances');
const OrdinanceService = {
  _addOrdinance,
  _deleteOrdinance,
  _getAllOrdinance,
};

export default OrdinanceService;
