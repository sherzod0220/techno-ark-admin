import { Outlet } from "react-router-dom"
import { ConfigProvider } from 'antd'

const App = () => {
  return (
    <>
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
