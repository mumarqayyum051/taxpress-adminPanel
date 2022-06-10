import { _post, _delete, _get } from './HttpService';

const _addOrdinance = (data) => _post('/ordinance/addOrdinance', data);
const _deleteOrdinance = (id) => _delete(`/ordinance/deleteOrdinance/${id}`);
const _deleteOrdinanceDetail = (id) => _delete(`/ordinanceDetail/deleteOrdinanceDetail/${id}`);
const _getAllOrdinance = () => _get('/ordinance/getAllOrdinance');
const _getAllOrdinanceByType = (type) => _get(`/ordinance/getAllOrdinanceByType/${type}`);
const _addOrdinanceDetail = (data) => _post(`/ordinanceDetail/addOrdinanceDetail`, data);
const _getOrdinanceDetail = () => _get(`/ordinanceDetail/getOrdinanceDetail`);

const OrdinanceService = {
  _addOrdinance,
  _deleteOrdinance,
  _getAllOrdinance,
  _getAllOrdinanceByType,
  _addOrdinanceDetail,
  _getOrdinanceDetail,
  _deleteOrdinanceDetail,
};

export default OrdinanceService;
