import { _delete, _get, _post } from './httpService';

const _addNotification = (notificationData) => _post('/notifications/createNotification', notificationData);
const _getAllNotifications = () => _get('/notifications/getAllNotifications');
const _deleteNotification = (notificationID) => _delete(`/notifications/deleteNotification/${notificationID}`);
const _getNotificationTypes = () => _get('/notifications/getNotificationTypes');

const NotificationService = {
  _addNotification,
  _deleteNotification,
  _getAllNotifications,
  _getNotificationTypes,
};

export default NotificationService;
