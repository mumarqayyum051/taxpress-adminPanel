import { _get, _post, _put, _delete } from './httpService';

const _addDictionary = (caseData) => _post('/dictionary/add', caseData);

const _getAllDictionarys = () => _get('/counts/getCounts');

const _deleteDictionary = (caseID) => _delete(`/cases/deleteDictionary/${caseID}`);

const _searchDictionary = (caseData) => _post('/cases/searchDictionary', caseData);

const DictionaryService = {
  _addDictionary,
  _searchDictionary,
  _getAllDictionarys,
  _deleteDictionary,
};

export default DictionaryService;
