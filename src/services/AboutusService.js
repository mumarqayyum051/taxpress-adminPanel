import { _get, _post, _put, _delete } from './HttpService';

const _changeAboutus = (data) => _post('/aboutUs/changeAboutUs', data);
const _getAboutus = () => _get('/aboutUs/getAboutUs');
const _deleteAboutus = (id) => _delete(`/aboutUs/deleteAboutUs/${id}`);

const ClientService = {
  _changeAboutus,
  _getAboutus,
  _deleteAboutus,
};

export default ClientService;
