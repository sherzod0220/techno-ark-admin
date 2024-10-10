import { AdminService } from '@service'
import { useEffect, useState } from "react";
import { Button,Tooltip } from 'antd';
import { getData } from '@token-service'
import { EditOutlined,UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"
import { GlobalDelete } from "@components"
import adminImg from '../../assets/admin.jpg'
import Notification from '@notification';
// import { AdminUpdate } from '@modals';

const Index = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // const [open,setOpen] = useState(false)
  const id: any = getData("id")
  const [data,setData]: any = useState([])
//  console.log(id,"admin_id");
  const getAdmin = async () => {
    try {
      const response = await AdminService.get_by_id(id);
      if (response.status === 200) {
        setData(response?.data?.data);
      }
    } catch (err: any) {
      console.log(err);
    }
};
useEffect(() => {
    getAdmin();
}, []);
const moveAuth = () => {
  setLoading(true)
  navigate("/sign-up")
}


const deleteData = async (id: number) => {
  // setLoading(true);
  try {
    const response = await AdminService.delete(id);
    if (response?.status === 200) {
      Notification({
        type:"success",
        title: "Category deleted successfully",
      });
      // setIsModalVisible(false);
      // onSuccess();
    }
  } catch (error: any) {
    Notification({
      type:"error",
      title: `Failed to delete category! ${error?.response?.data?.message},Something went wrong`,
    });
  }
  // setLoading(false);
};


  return (
    <div>
      <div className='h-[50vh] w-full py-[50px] px-[50px] flex justify-between'>
        <div className='w-[25%]'>
          <img src={adminImg} alt="" className='w-full'/>
        </div>
        <div className='flex flex-col justify-between gap-[30px] w-[55%] px-[40px]'>
          <div className='flex gap-[20px] items-center '>
            <p className='text-[25px]'>Role:</p>
            <h1 className='text-[25px] font-semibold'>{data.role}</h1>
          </div>
          <div className='flex gap-[100px] w-[100%] '>
            <div className='flex flex-col gap-[30px]'>
              <span className='flex flex-col'>
                <p className=''>Firs Name</p>
                <h1 className='text-[22px] font-semibold'>{data.first_name}</h1>
              </span>
              <span className='flex flex-col'>
                <p>Last Name</p>
                <h1 className='text-[22px] font-semibold'>{data.last_name}</h1>
              </span>
            </div>

            <div className='flex flex-col gap-[30px]'>
            <span className='flex flex-col'>
                <p>Email</p>
                <h1 className='text-[22px] font-semibold'>{data.email}</h1>
              </span>
              <span className='flex flex-col'>
                <p>Phone Number</p>
                <h1 className='text-[22px] font-semibold'>{data.phone_number}</h1>
              </span>
            </div>
          </div>
          <div className='flex gap-[20px]'>
            {/* <AdminUpdate open={open} handleCancel={handleCancel}/> */}
            <Tooltip title="Add New Account">
            <Button 
              loading={loading} 
              onClick={moveAuth} 
              type='primary' 
              className='bg-[#5ec35e]'
              style={{width:"45px"}}
              icon={<UserAddOutlined />}
            />
            </Tooltip>
            <Tooltip title="Update account">
            <Button 
              // onClick={()=>openModal(record)}
              type='primary' 
              icon={<EditOutlined />}
              style={{width:"45px"}}
              className='px-[30px] rounded-[6px] bg-[orange]'
            />
            </Tooltip>  
            <Tooltip title="Delete Account">
            <GlobalDelete
              id={id}
              onConfirm={deleteData}
              onCancel={() => console.log('Cancelled')}
              title={"Delete this Account ?"}
            />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
