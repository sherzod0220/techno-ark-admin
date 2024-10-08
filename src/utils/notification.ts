// import { notification } from 'antd';
// import { IconType } from 'antd/es/notification/interface';
// type IProp = {
//   message: string
//   type: IconType
//   description?: string
//   showProgress: boolean
//   pauseOnHover: boolean
// }
  
//   const Notification = (prop: IProp) => {
//     const {message, type, description,showProgress ,pauseOnHover} = prop
//     notification.open({
//       message: message,
//       type: type,
//       description: description,
//       showProgress: showProgress,
//       pauseOnHover: pauseOnHover,
//     });
//   };
//   export default Notification

  import { toast } from 'react-toastify';
interface IType {
  title: string,
  type: any
}
const Notification = (props:IType) => {
    const {title, type} = props
    return toast(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        type: type,
    });
}

export default Notification