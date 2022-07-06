import { _get, _post, _put, _delete } from './HttpService';

const _uploadBg = (data) => _post(`/backgrounds/uploadBgs`, data);

const _getBgs = () => _get(`/backgrounds/getBgs`);

const _getAllBGs = () => _get(`/backgrounds/getAllBGs`);
const _deleteBg = (id) => _delete(`/backgrounds/deleteBg/${id}`);

const BackgroundService = {
  _deleteBg,
  _getBgs,
  _uploadBg,
  _getAllBGs,
};

export default BackgroundService;
