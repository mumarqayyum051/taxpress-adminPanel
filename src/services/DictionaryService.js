import { _get, _post, _put, _delete } from './httpService';

const _addDictionary = (caseData) => _post('/dictionary/add', caseData);

const _getAllDictionarys = () => _get('/dictionary/getAll');

const _deleteDictionary = (caseID) => _delete(`/dictionary/deleteDictionary/${caseID}`);

const _searchDictionary = (caseData) => _post('/dictionary/searchDictionary', caseData);

const DictionaryService = {
  _addDictionary,
  _searchDictionary,
  _getAllDictionarys,
  _deleteDictionary,
};

export default DictionaryService;
