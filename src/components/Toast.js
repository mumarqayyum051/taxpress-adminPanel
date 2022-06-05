/* eslint-disable import/no-duplicates */
import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import { useEffect } from 'react';

const Toast = ({ message, type }) => {
  useEffect(() => {
    Store.addNotification({
      title: 'Wonderful!',
      message,
      type,
      insert: 'top',
      container: 'bottom-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  }, []);

  return <ReactNotifications />;
};

export default Toast;
