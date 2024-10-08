import { Outlet } from "react-router-dom"
import { ConfigProvider } from 'antd'
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
    <ToastContainer />
      <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#d55200",
      },
    }}  
    >
      <>
        <Outlet/>
      </>
    </ConfigProvider>
    </>
  )
}

export default App
