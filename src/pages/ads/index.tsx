import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyComponent = () => {
  const handleSuccess = () => {
    toast('Muvaffaqiyatli amalga oshirildi!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      type: "success",

    });
  };

  const handleError = () => {
    toast.error('Xatolik yuz berdi!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div>
      <button onClick={handleError}>Xatolik xabari</button>
      <button onClick={handleSuccess}>Muvaffaqiyatli xabar</button>
      <ToastContainer />
    </div>
  );
};

export default MyComponent;