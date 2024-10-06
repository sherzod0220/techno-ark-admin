import { notification } from 'antd';
import { IconType } from 'antd/es/notification/interface';
type IProp = {
  message: string
  type: IconType
  description?: string
  showProgress: boolean
  pauseOnHover: boolean
}
  
  const Notification = (prop: IProp) => {
    const {message, type, description,showProgress ,pauseOnHover} = prop
    notification.open({
      message: message,
      type: type,
      description: description,
      showProgress: showProgress,
      pauseOnHover: pauseOnHover,
    });
  };
  export default Notification