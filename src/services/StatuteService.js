import { _delete, _post } from './httpService';

const _addStatute = (statuteData) => _post('/statutes/addStatutes', statuteData);

const _deleteStatute = (statuteID) => _delete(`/statutes/deleteStatute/${statuteID}`);

const CaseLawService = {
  _addStatute,
  _deleteStatute,
};

export default CaseLawService;
