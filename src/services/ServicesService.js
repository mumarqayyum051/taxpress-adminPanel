import { _post, _delete, _get } from './HttpService';

const _createService = (data) => _post('/registrationServices/createService', data);
const _getAllServices = () => _get('/registrationServices/getAllServices');
const _deleteService = (id) => _delete(`/registrationServices/deleteService/${id}`);
const ServicesService = {
  _createService,
  _getAllServices,
  _deleteService,
};

export default ServicesService;
