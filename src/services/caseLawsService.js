import { _get, _post, _put, _delete } from "./httpService";

const _addCase = (caseData) => {
  return _post("/cases/addCase", caseData);
};

const _getAllCases = () => {
  return _get("/cases/getAllCases");
};

const _deleteCase = (caseID) => {
  return _delete("/cases/deleteCase/" + caseID);
};
const _searchCase = (caseData) => {
  return _post("/cases/searchCase", caseData);
};

const libraryService = {
  _addCase,
  _searchCase,
  _getAllCases,
  _deleteCase,
};

export default libraryService;
