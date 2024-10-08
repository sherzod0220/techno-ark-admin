import { TypeOptions, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProp {
  title: string;
  type: TypeOptions | undefined;
}

const Notification = (props: NotificationProp) => {
    return toast(props.title, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      type: props.type,
      theme: "light"
    });
};

export default Notification;