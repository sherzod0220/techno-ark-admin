import { ProductsService } from "@service";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ProductDetailAddUpdate } from "@modals";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { GlobalDelete } from "@components"
import { notification } from "antd";
import { ProductDetailService } from "@service";

const Index = () => {
    const {id}: any = useParams()
    console.log(id, "useparams");
    
    const [product,setProduct]: any = useState([])
    const [detail, setDetail]:any = useState([])
    const [open,setOpen] = useState(false)
    const [category,setCategory] = useState({})
    console.log(category);
    
    const getProduct = async () => {
        try {
          const response = await ProductsService.get_by_id(id);
          if (response.status === 200) {
            setProduct(response?.data?.data?.product);
            setDetail(response?.data?.data?.product_detail)
          }
        } catch (err: any) {
          console.log(err);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    console.log(product,"product");
    console.log(detail,"detail");
    
    const openModal =(item:any)=>{  
        setCategory(item)
        setOpen(true)
      }
      const handleCancel =()=>{
        setCategory({})
        setOpen(false)
    }

    const deleteData = async (id: number) => {
        // setLoading(true);
        try {
          const response = await ProductDetailService.delete(id);
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
    
  return (
    <>
            <ProductDetailAddUpdate open={open} handleCancel={handleCancel} detail={detail} product={product}/>
        {
            detail === null ? (
                <div className="flex flex-col gap-[15px]">
                    <div className="flex items-center gap-[20px]">
                        <h2 className="text-[24px] font-semibold">Product name:</h2>
                        <p className="text-[24px] font-semibold text-[#e74c3c]">{product.name}</p>
                    </div>

                    <div className="flex items-center gap-[20px]">
                        <h2 className="text-[24px] font-semibold">Product Price:</h2>
                        <p className="text-[24px] font-semibold text-[#e74c3c]">{product.price}</p>
                    </div>
                    <div className="flex items-center gap-[20px]">
                        <h2 className="text-[24px] font-semibold">Product detail</h2>
                        {/* <button className="bg-[#e74c3c] text-[white] px-[30px] text-[20px] py-[6px] rounded-[10px]">Add product details</button> */}
                        <Tooltip title="Add Brand">
                            <Button type="primary" onClick={()=>setOpen(true)} style={{background: "#e74c3c"}}>Add Product Detail</Button>
                        </Tooltip>
                    </div>
                </div>
            ) : (
            <div className="flex h-[85vh]">
                <div className="w-[50%] bg-sky-100">
                <img src={product.images} alt="" />
                <p>{product.images}</p>
                </div>
                <div className="w-[50%] flex justify-center pt-[100px]">
                    <div className="flex flex-col gap-[20px] w-[100%] px-[100px]">
                        <div className="w-[100%] flex justify-center py-[10px] px-[20px] border-b-[2px] border-b-[gray]">
                            <h1 className="text-[25px] font-semibold">{product.name}</h1>
                        </div>
                        <div className="w-[100%] flex gap-[50px] justify-between items-center py-[5px] border-b-[2px] border-b-[lightgray]">
                            <h2 className="text-[20px] font-semibold">Description:</h2>
                            <p className="text-[17px] font-medium text-[gray]">{detail.description}</p>
                        </div>
                        <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[2px] border-b-[lightgray]">
                        <h2 className="text-[20px] font-semibold">Product color</h2>
                            <p className="text-[17px] font-medium">{detail.colors}</p>
                        </div>
                        <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[2px] border-b-[lightgray]">
                            <h2 className="text-[20px] font-semibold">Prduict quantity</h2>
                            <p className="text-[17px] font-medium">{detail.quantity}</p>
                        </div>
                        <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[2px] border-b-[lightgray]">
                            <h2 className="text-[20px] font-semibold">Product discount</h2>
                            <p className="text-[17px] font-medium">{detail.discount}%</p>
                        </div>
                        <div className="w-[100%] flex justify-between items-center py-[10px] border-b-[2px] border-b-[lightgray]">
                            <h2 className="text-[20px] font-semibold">Product price</h2>
                            <span className="flex items-center gap-[10px]">
                                <p className="text-[gray]"><del>{product.price}$</del></p>
                                <p className="text-[17px] font-medium">{product.price-product.price/(detail.discount)}$</p>
                            </span>
                        </div>
                        <div className="flex items-center gap-[20px]">
                        <Tooltip title="Edit">
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={openModal}
                                />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <GlobalDelete
                                id={detail.id}
                                onConfirm={deleteData}
                                onCancel={() => console.log('Cancelled')}
                                title={"Delete this Category ?"}
                             />
                        </Tooltip>
                        </div>
                    </div>
                </div>
            </div>    

            )
        }
    </>
  )
}

export default Index
