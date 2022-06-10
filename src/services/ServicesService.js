import { _post, _delete, _get } from './HttpService';

const _createService = (data) => _post('/registrationServices/createService', data);
const _getAllServices = () => _get('/registrationServices/getAllServices');
const ServicesService = {
  _createService,
  _getAllServices,
};

export default ServicesService;
