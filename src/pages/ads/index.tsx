// import { useLocation, useNavigate} from "react-router-dom"; // To manage query params
import { useEffect, useState } from "react";
import { AdsService } from "@service";
import { Table } from "@components";
import { Button, Space, Tooltip } from "antd";
import { AdsActions } from "@modals";
import { GlobalDelete } from '@components'
import Notification from "@notification";
const Index = () => {
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false)
  const [category,setCategory] = useState({})
  // const [categories,setCategories] = useState([])
  // const [total, setTotal] = useState(0); // To store the total number of items
  // const location = useLocation()
  // const navigate = useNavigate()
  // const val = new URLSearchParams(location.search)
  
  // const [params, setParams] = useState({
  //   search: val.get('search') ||'',
  //   page: 1,
  //   limit: 10,
  // });

  
  const getData = async () => {
    try {
      const response = await AdsService.get();
      if (response.status === 200) {
        setData(response?.data?.data);
        // setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Fetch data whenever params change

  // useEffect(()=>{
  //   // const params = new URLSearchParams(location.search)
  //   // const page = params.get("page")
  //   // const limit = params.get('limit')
  //   // const input_val = params.get("search")
  //   // const find = input_val ? input_val : ""
  //   // const pageNumber = page ? parseInt(page) : 1
  //   // const limitPage = limit ? parseInt(limit) : 10
  //   // setParams(prevParams =>({
  //   //   ...prevParams,
  //   //   page: pageNumber,
  //   //   // search: find,
  //   //   // limit: limitPage
  //   // }))
  // },[location.search])
  // Handle table pagination changes
  // const handleTableChange = (pagination: any) => {
  //   const { current = 1, pageSize = 10 } = pagination;
  //   // Update pagination parameters and set them in the URL query params
  //   // setParams((prev) => ({
  //   //   ...prev,
  //   //   page: current,
  //   //   limit: pageSize,
  //   // }));
  //   // const searchParams = new URLSearchParams(location.search)
  //   //    searchParams.set("page", `${current}`)
  //   //    searchParams.set("limit", `${pageSize}`)
  //   //    navigate(`?${searchParams}`)
  // };
  
  const handleCancel =()=>{
    setCategory({})
    setOpen(false)
  }

  const deleteData = async (id: number) => {
    // setLoading(true);
    try {
      const response = await AdsService.delete(id);
      if (response?.status === 200) {
        getData()
        Notification({
          type:"success",
          title: "Category deleted successfully",
        });
      }
    } catch (error: any) {
      Notification({
        type: "error",
        title: `Failed to delete category! ${error?.response?.data?.message}, Something went wrong`,
      });
    }
    // setLoading(false);
  };
  
  

  const columns: any = [
    { 
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_text: string, _record: any, index: number) =>
        `${index + 1}`,  
    },
    { 
      title: 'Image', 
      dataIndex: 'image', 
      key: 'image', 
      align: "center" ,
      render: (image: any,_record: any) => <img src={image}/>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      align: "center",
   },
    {
      title: "Actions", 
      key: "actions", 
      align: "center",
      render: (_text: string, record: any) => (
        <Space size={"middle"}>
          <Tooltip title="Delete">
            <GlobalDelete
              id={record.id}
              onConfirm={deleteData}
              onCancel={() => console.log('Cancelled')}
              title={"Delete this Category ?"}
            />
          </Tooltip>
        </Space>
      ),
    }
  ];

  
  
  return (
    <div className="flex flex-col gap-[20px]">
      <AdsActions open={open} handleCancel={handleCancel} category={category} getData={getData}/>
      <div className="flex justify-between items-center">
        <div className="flex justify-between my-2">
        <Tooltip title="Add Brand">
          <Button type="primary" onClick={()=>setOpen(true)}>Add Brand</Button>
        </Tooltip>
        </div>
      </div>
      <Table
        data={data}
        columns={columns}
        pagination={{ pageSize: 10 }} onChange={function (): void {
          throw new Error("Function not implemented.");
        } }        // onChange={handleTableChange}
      />
      
    </div>
  )
}

export default Index
