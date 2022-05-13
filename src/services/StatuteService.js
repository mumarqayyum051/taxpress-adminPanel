import { _delete, _get, _post } from './httpService';

const _addStatute = (statuteData) => _post('/statutes/addStatutes', statuteData);

const _getAllStatutes = () => _get('/statutes/getAllStatutes');
const _deleteStatute = (statuteID) => _delete(`/statutes/deleteStatute/${statuteID}`);

const CaseLawService = {
  _addStatute,
  _deleteStatute,
  _getAllStatutes,
};

export default CaseLawService;
