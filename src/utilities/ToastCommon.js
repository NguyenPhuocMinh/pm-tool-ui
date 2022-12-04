import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

const ToastCommon = ({ theme }) => {
  return (
    <ToastContainer
      newestOnTop
      draggable
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      limit={10}
      theme={theme}
      autoClose={5000}
      hideProgressBar={false}
    />
  );
};

export default ToastCommon;
