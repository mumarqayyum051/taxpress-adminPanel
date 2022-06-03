import { _post } from './HttpService';

const _addCase = (caseData) => {
  return _post('/cases/addCase', caseData);
};

const _searchCase = (caseData) => {
  return _post('/cases/searchCase', caseData);
};

const libraryService = {
  _addCase,
  _searchCase,
};

export default libraryService;
