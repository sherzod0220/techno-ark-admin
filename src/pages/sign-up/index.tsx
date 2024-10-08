import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { auth } from "@service"
import { saveData } from "@token-service"
import { useNavigate } from "react-router-dom"
import img from '../../assets/login.svg'
import Notification from "@notification"
type FieldType = {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string;
    password: string;
  };
  const Index = () => {
    const navigate = useNavigate()

    const onFinish: FormProps<FieldType>["onFinish"] = async(values) => {
        try {
          const response: any = await auth.sign_up(values)
          if (response && response.status === 201) {
              Notification({type: "success", title: "Registered successfully"})
            const data = response.data?.data;
            if (data && data.tokens && data.tokens.access_token) {
              const { tokens: { access_token } } = data;
              saveData("access_token", access_token);
              navigate("/main")
              console.log(response);
              
            } else {
              console.error("Tokens or access_token is missing in the response data");
              Notification({type: "error",title: "Error! Tokens or access_token is missing in the response data"})
            }
          } else {
            console.error(`Unexpected response status: ${response?.status}`);
            Notification({type: "error",title: `Error! Unexpected response status: ${response?.status}`})
          }
        } catch (error) {
          console.error("Error during sign-in:", error);
          Notification({type: "error",title: `incorrect phone number or password, try again! Error during sign-up: ${error}`})
        }
      };
    
      const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
      ) => {
        console.log("Failed:", errorInfo);
      };
      const login =()=>{
        navigate("/")
      }
    
  return (
    <div className='w-full flex h-[100vh]'>
        <div className='w-[50%] bg-sky-100 flex justify-center items-center'>
            <img src={img} alt="" className=''/>
        </div>
        <div className='w-[50%] flex justify-center items-center gap-[20px] flex-col px-[50px]'>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400,width:"100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout='vertical'
                className='flex flex-col'
            >
            <label className='text-[35px] font-semibold '>Registrate</label>
            <Form.Item<FieldType>
                label="First name"
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input className='py-[10px] text-[16px]'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Last name"
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input className='py-[10px] text-[16px]'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input className='py-[10px] text-[16px]'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Phone number"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input className='py-[10px] text-[16px]'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password className='py-[10px] text-[16px]'/>
            </Form.Item>

        
            <Form.Item  className=''>
                <Button type="primary" className='py-[20px] text-[18px]' htmlType="submit" style={{background: "#e74c3c", width:"100%"}}>
                    register-
                </Button>
            </Form.Item>
            </Form>
            <div className='flex gap-[20px] items-center'>
              <p>Already have an account?</p>
              <button onClick={login} className='text-[20px] font-semibold'>login</button>
            </div>
        </div>

    </div>
  )
}

export default Index
