import { _get, _post, _put, _delete } from './HttpService';

const _createAppointment = (data) => _post('/appointments/createAppoinmentSlot', data);

const _deleteAppointment = (id) => _delete(`/appointments/deleteAppointmentSlot/${id}`);

const _getAllAppointments = () => _get(`/appointments/getAppointmentSlots`);

const _getSlotsByType = (type) => _get(`/appointments/getAppointmentSlotsByType/${type}`);

const AppointmentsService = {
  _createAppointment,
  _deleteAppointment,
  _getAllAppointments,
  _getSlotsByType,
};

export default AppointmentsService;
