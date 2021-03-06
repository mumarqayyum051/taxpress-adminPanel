import { _delete, _get, _post } from './HttpService';

const _addNotification = (notificationData) => _post('/notifications/createNotification', notificationData);
const _getAllNotifications = () => _get('/notifications/getAllNotifications');
const _deleteNotification = (notificationID) => _delete(`/notifications/deleteNotification/${notificationID}`);
const _getNotificationTypes = () => _get('/notifications/getNotificationTypes');
const _getAllNotificationTypes = () => _get('/notifications/getNotificationTypes');
const _deleteNotificationType = (id) => _delete(`/notifications/deleteNotificationType/${id}`);
const _addNotificationType = (notificationTypeData) =>
  _post('/notifications/createNotificationType', notificationTypeData);
const NotificationService = {
  _addNotification,
  _deleteNotification,
  _getAllNotifications,
  _getNotificationTypes,
  _getAllNotificationTypes,
  _deleteNotificationType,
  _addNotificationType,
};

export default NotificationService;
