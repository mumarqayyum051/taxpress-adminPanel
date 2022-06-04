import { _delete, _get, _put, _post } from './HttpService';

const _addMember = (data) => _post('/team/addMember', data);
const _getAllMembers = () => _get('/team/getAllMembers');
const _deleteMember = (id) => _delete(`/team/deleteMember/${id}`);
const _editMember = (data, id) => _put(`/team/editMember/${id}`, data);
const TeamService = { _addMember, _getAllMembers, _deleteMember, _editMember };

export default TeamService;
