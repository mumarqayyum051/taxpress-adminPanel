import { _get, _post, _put, _delete } from './HttpService';

const _createAppointment = (data) => _post('/appointments/createAppoinmentSlot', data);

const _deleteAppointmentSlot = (id) => _delete(`/appointments/deleteAppointmentSlot/${id}`);

const _getAllAppointmentSlots = () => _get(`/appointments/getAppointmentSlots`);

const _getSlotsByType = (type) => _get(`/appointments/getAppointmentSlotsByType/${type}`);

const _getAllAppointments = () => _get(`/appointments/getAllAppointments`);

const _changeAppointmentStatus = (data, id) => _put(`/appointments/changeAppointmentStatus/${id}`, data);

const _assignment = (data, id) => _post(`/appointments/assignment/${id}`, data);
const AppointmentsService = {
  _createAppointment,
  _deleteAppointmentSlot,
  _getAllAppointmentSlots,
  _getAllAppointments,
  _changeAppointmentStatus,
  _getSlotsByType,
  _assignment,
};

export default AppointmentsService;
