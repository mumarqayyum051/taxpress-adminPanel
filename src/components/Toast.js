import { ToastContainer, toast } from 'react-toastify';

const Toast = ({ message, type }) => {
  const notify = () =>
    toast(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type,
    });

  return <ToastContainer />;
};

export default Toast;
