import { _delete, _get, _put, _post } from './HttpService';

const _addStatute = (statuteData) => _post('/statutes/addStatutes', statuteData);

const _getAllStatutes = () => _get('/statutes/getAllStatutes');
const _getStatutesOnly = () => _get('/statutes/getStatutesOnly');
const _deleteStatute = (statuteID) => _delete(`/statutes/deleteStatute/${statuteID}`);
const _getStatuteById = (statuteID) => _get(`/statutes/getStatuteById/${statuteID}`);
const _editStatute = (statuteData, statuteId) => _put(`/statutes/editStatute/${statuteId}`, statuteData);
const CaseLawService = {
  _addStatute,
  _deleteStatute,
  _getAllStatutes,
  _getStatuteById,
  _getStatutesOnly,
  _editStatute,
};

export default CaseLawService;
