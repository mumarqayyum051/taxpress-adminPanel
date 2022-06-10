import { _post, _delete, _get } from './HttpService';

const _createService = (data) => _post('/registrationServices/createService', data);

const ServicesService = {
  _createService,
};

export default ServicesService;
