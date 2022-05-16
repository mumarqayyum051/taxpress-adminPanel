import { _get, _post, _put, _delete } from './httpService';

const _addCase = (caseData) => _post('/cases/addCase', caseData);

const _updateCase = (caseData, caseID) => _put(`/cases/updateCase/${caseID}`, caseData);
const _getAllCases = () => _get('/cases/getAllCases');

const _deleteCase = (caseID) => _delete(`/cases/deleteCase/${caseID}`);

const _searchCase = (caseData) => _post('/cases/searchCase', caseData);

const CaseLawService = {
  _addCase,
  _updateCase,
  _searchCase,
  _getAllCases,
  _deleteCase,
};

export default CaseLawService;
