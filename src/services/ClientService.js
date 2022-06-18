import { _get, _post, _put, _delete } from './HttpService';

const _addClient = (data) => _post('/clients/addClient', data);
const _getAllClients = () => _get('/clients/getClients');
const _deleteClient = (id) => _delete(`/clients/deleteClient/${id}`);

const ClientService = {
  _addClient,
  _getAllClients,
  _deleteClient,
};

export default ClientService;
