import {auth} from "@service"
import { saveData } from "@token-service"
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from "react-router-dom"
import Notification from "@notification";
import img from '../../assets/login.svg'
type FieldType = {
    phone_number: string;
    password: string;
  };

const Index = () => {
    const navigate = useNavigate()

    const onFinish: FormProps<FieldType>["onFinish"] = async(values) => {
        try {
          const response: any = await auth.sign_in(values)
          if (response && response.status === 201) {
            // Notification({
            //     message: "Login successfully!",
            //     type: "success",
            //   });
              Notification({message: "Login successfully",type: "success", showProgress: true,pauseOnHover:true})
            const data = response.data?.data;
            // const id = 
            if (data && data.tokens && data.tokens.access_token) {
              const { tokens: { access_token } } = data;
              saveData("access_token", access_token);
              saveData("id",data?.data?.id);
              navigate("/main")
              console.log(response);
              console.log(data.data.id,"tokedata");
              
              
            } else {
              console.error("Tokens or access_token is missing in the response data");
            //   Notification({type: "error",message: "error" ,description: "Tokens or access_token is missing in the response data", showProgress: true,pauseOnHover:true})
            }
          } else {
            console.error(`Unexpected response status: ${response?.status}`);
            // Notification({type: "error",message: "error" ,description: `Unexpected response status: ${response?.status}`, showProgress: true,pauseOnHover:true})
          }
        } catch (error) {
          console.error("Error during sign-in:", error);
        //   Notification({type: "error",message: "incorrect phone number or password, try again" ,description: `Error during sign-in: ${error}`, showProgress: true,pauseOnHover:true})
        }
      };
    
      const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
      ) => {
        console.log("Failed:", errorInfo);
      };
      const register =()=>{
        navigate("/sign-up")
      }
  return (
    <div className="flex h-[100vh]">
        <div className="w-[50%] flex justify-center items-center bg-[#fffef2]">
            <img src={img} alt="" className="w-[50%]"/>
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
            <label className='text-[35px] font-semibold '>Login</label>
            <Form.Item<FieldType>
                label="Phone number"
                name="phone_number"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input type='text' className='py-[10px] text-[16px]'/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password className='py-[10px] text-[16px]'/>
            </Form.Item>

        
            <Form.Item  className=''>
                <Button type="primary" className='py-[20px] text-[18px]' htmlType="submit" style={{background: "#d55200", width:"100%"}}>
                    Login
                </Button>
            </Form.Item>
            </Form>
            <div className='flex gap-[20px] items-center'>
              <p>Don’t you have an account?</p>
              <button onClick={register} className='text-[20px] font-semibold'>Registrate</button>
            </div>
        </div>
    </div>
  )
}

export default Index
