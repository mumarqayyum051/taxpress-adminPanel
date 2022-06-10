import { _post, _delete, _get } from './HttpService';

const _createServiceType = (data) => _post('/registrationServiceType/createRegistrationServiceType', data);
const _getAllServiceTypes = () => _get('/registrationServiceType/getAllRegistrationServiceTypes');
const _deleteServiceType = (id) => _delete(`/registrationServiceType/deleteRegistrationServiceType/${id}`);
const ServiceTypeService = {
  _createServiceType,
  _getAllServiceTypes,
  _deleteServiceType,
};

export default ServiceTypeService;
