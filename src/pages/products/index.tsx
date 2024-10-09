import { useLocation, useNavigate} from "react-router-dom"; // To manage query params
import { useEffect, useState } from "react";
import { ProductsService } from "@service";
import { Table, Search } from "@components";
import { Button, Space, Tooltip } from "antd";
import { EyeOutlined ,EditOutlined} from "@ant-design/icons";
import { GlobalDelete } from "@components"
import { notification } from "antd";
// import { TestDrawer } from "@modals";
import { ProductsActions } from "@drawers";

const Index = () => {
  const [data, setData] = useState([]);
  const [open,setOpen] = useState(false)
  const [total, setTotal] = useState(0); // To store the total number of items
  const location = useLocation()
  const navigate = useNavigate()
  const val = new URLSearchParams(location.search)
  const [category,setCategory] = useState({})
  // const [product,setProduct] = useState({})

  const [params, setParams] = useState({
    search: val.get('search') ||'',
    page: 1,
    limit: 10,
  });
  
  const getProducts = async () => {
    try {
      const response = await ProductsService.get(params);
      if (response.status === 200) {
        setData(response?.data?.data?.products);
        setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
        
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, [params]); // Fetch data whenever params change

  // console.log(data,"products");
  
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const page = params.get("page")
    const limit = params.get('limit')
    const input_val = params.get("search")
    const find = input_val ? input_val : ""
    const pageNumber = page ? parseInt(page) : 1
    const limitPage = limit ? parseInt(limit) : 10
    setParams(prevParams =>({
      ...prevParams,
      page: pageNumber,
      search: find,
      limit: limitPage
    }))
  },[location.search])
  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    const { current = 1, pageSize = 10 } = pagination;
    // Update pagination parameters and set them in the URL query params
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));
    const searchParams = new URLSearchParams(location.search)
       searchParams.set("page", `${current}`)
       searchParams.set("limit", `${pageSize}`)
       navigate(`?${searchParams}`)
  };
  
  const openModal = (item:any) => {
    setCategory(item)
    setOpen(true);
  };

  const handleCancel = () => {
    setCategory({})
    setOpen(false);
  };

  const moveSingle = (id: number) => {
    // console.log(id);
    navigate(`/main/products/${id}`);
  };

  const deleteData = async (id: number) => {
    // setLoading(true);
    
    try {
      const response = await ProductsService.delete(id);
      if (response?.status === 200) {
        notification.success({
          message: "Category deleted successfully",
        });
        // setIsModalVisible(false);
        // onSuccess();
      }
    } catch (error: any) {
      notification.error({
        message: "Failed to delete category",
        description: error?.response?.data?.message || "Something went wrong",
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
        `${(params.page - 1) * params.limit + index + 1}`,  
    },
    { title: 'Name', dataIndex: 'name', key: 'name', align: "center" },
    {
      title: "Actions", 
      key: "actions", 
      align: "center",
      render: (_text: string, record: any) => (
        <Space size={"middle"}>
          
          {/* Adit draewe */}
          <Tooltip title="Edit" >
            {/* <TestDrawer 
              title="edit" 
              id={record.id}
              data={data}
              // onClick={()=>openModal(record)}
            />     */}
             <Button
              type="default"
              icon={<EditOutlined />}
              onClick={()=>openModal(record)}
              style={{width:"45px", color:"#d55200", borderColor:"#d55200"}}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <GlobalDelete
              id={record.id}
              onConfirm={deleteData}
              onCancel={() => console.log('Cancelled')}
              title={"Delete this Category ?"}
            />
          </Tooltip>

            <Button
              className="border-[1px] border-[#e74c3c] text-[#e74c3c] p-[10px]"
              // type="default"
              icon={<EyeOutlined />}
              onClick={() => moveSingle(record.id)}
              style={{width:"45px", color:"#d55200", borderColor:"#d55200"}}
            />
        </Space>
      ),
    }
  ];
  return (
    <div className="flex flex-col gap-[20px]">
      <ProductsActions open={open} handleCancel={handleCancel} category={category}/>
      <div className="flex justify-between items-center">
        <span className="w-[300px]">
            <Search params={params} setParams={setParams}/>
        </span>
        <div className="flex justify-between my-2">
          <Tooltip title="Add Product">
            <Button type="primary" onClick={()=>setOpen(true)} style={{background: "#d55200"}}>Add Product</Button>
          </Tooltip>
        </div>
        
      </div>
      <Table
        data={data}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '7', '10'],
        }}
        onChange={handleTableChange}
      />
      
    </div>
  )
}

export default Index
