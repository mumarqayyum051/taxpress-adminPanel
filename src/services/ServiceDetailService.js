import { _post, _delete, _get } from './HttpService';

const _createServiceDetail = (data) => _post('/registrationServiceDetail/createServiceDetail', data);
const _deleteService = (id) => _delete(`/registrationServiceDetail/deleteService/${id}`);
const _getAllServices = () => _get('/registrationServiceDetail/getAllServices');

const ServicesDetailService = {
  _createServiceDetail,
  _getAllServices,
  _deleteService,
};

export default ServicesDetailService;
