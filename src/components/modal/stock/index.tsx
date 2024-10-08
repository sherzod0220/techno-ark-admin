import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,Select } from "antd";
// import { PlusOutlined } from '@ant-design/icons';
import { CategoryService, BrandService,ProductsService,StockService } from "@service";
import Notification from "@notification";

const { Option } = Select;
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  stock: any,
  getData: any,
//   categories: any,
}
const BrandModal = ({ open, handleCancel, stock,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (stock.id) {
      form.setFieldsValue({
        category_id: Number(stock?.category_id?.id),
        brand_id: Number(stock?.brand_id),
        product_id: Number(stock?.product_id?.id),
        quantity: Number(stock?.quantity), 
      });
    } else {
      form.resetFields();
    }
  }, [stock, form]);
  console.log(stock,"edit uchun");
  

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoryid,setCategoryid] = useState(0)
  const [checkbrand,setCheckbrands] = useState(true)

  const [product, setProduct] = useState([]);
  const [brandid,setBrandid] = useState(0)
  const [checkproduct,setCheckProduct] = useState(true)

  // =========== categories ======================================
  const getCategories = async () => {
    try {
      const response = await CategoryService.get({ page: 1, limit: 100 });
    //   const response2 = await BrandService.get({ page: 1, limit: 100 });
      if (response.status === 200) {
        setCategories(response?.data?.data?.categories);
        // setBrands(response2?.data?.data?.brands);   
        // console.log(brands);    
        // setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleChange = (value: any) => {
    setCategoryid(value); // Tanlangan optionning cat.id ni statega saqlang
    setCheckbrands(false)
  };

  const handleChangeBrandCategory = (value: any) => {
    setBrandid(value); // Tanlangan optionning cat.id ni statega saqlang
    setCheckProduct(false)
  };


  // =========== Brand ======================================
  const getBrands = async () => {
    try {
      const response = await BrandService.get_by_id(categoryid,{ page: 1, limit: 100 });
      if (response.status === 200) {
        setBrands(response?.data?.data?.brands);  
        // setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBrands();
  }, [categoryid]);


 // =========== Products by id ======================================
 const getProducts = async () => {
    try {
      const response = await ProductsService.get_product_by_id(brandid,{ page: 1, limit: 100 });
      if (response.status === 200) {
        setProduct(response?.data?.data);  
        // console.log(brandcategories,"smth it");
        
        // setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, [brandid]);



  

  const handleSubmit = async(values: any) => {
    setLoading(true);
    if (stock.id) {
      // Update the stock
      try {
        const datas = {
            category_id: Number(values.category_id),
            brand_id: Number(values.brand_id),
            product_id: Number(values.product_id),
            quantity: Number(values.quantity), 
        }            
            
            const response = await StockService.update(stock.id,datas);
                        
            if (response?.status === 200) {
                Notification({
                    type:"success",
                    title: "Brand created successfully!",
                  });
              form.resetFields();
            }
      } catch (error: any) {
        Notification({
          type:"error",
          title: `Failed to update brand ${error?.response?.data?.message}, Something went wrong`,
        });
      } finally {
        setLoading(false);
      }
    } else {
        try {
            const datas = {
                category_id: Number(values.category_id),
                brand_id: Number(values.brand_id),
                product_id: Number(values.product_id),
                quantity: Number(values.quantity), 
            }
            
            const response = await StockService.create(datas);
            console.log(datas,"datats");
            
            if (response?.status === 201) {
                getData()
                Notification({
                    type:"success",
                    title: "Brand created successfully!",
                  });
              form.resetFields();
            }
        } catch (error: any) {
              Notification({
                type:"error",
                title: `Failed to add brand ${error?.response?.data?.message}, Something went wrong`,
            });
        }
    }
    setLoading(false);
    handleCancel(); // Close the modal after submission
  };

  return (
    <>
      <Modal
        open={open}
        title={stock.id ? "Edit brand" : "Create Product"}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
            {/* category */}
            <Form.Item
              name="category_id"
              label="Category name"
              rules={[
                { required: true, message: "Please select Category name" },
              ]}
            >
              <Select placeholder="Select a category" size="large" onChange={(e)=>{handleChange(e);
              }} >
                {categories.map((cat: any) => (
                  <Option key={cat.id} value={cat.id}  >
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {/* Brand by category */}
            <Form.Item
              name="brand_id"
              label="Brand name"
              rules={[{ required: true, message: "Please select Brand name" }]}
            >
              <Select placeholder="Please select brand name" disabled={checkbrand} onChange={(e)=>{handleChangeBrandCategory(e)}}>
              { brands && brands.map((cat: any) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>  

            {/* products by brand */}
            <Form.Item
              name="product_id"
              label="Product"
              rules={[
                { required: true, message: "Please select Product" },
              ]}
            >
              <Select placeholder="Please select Product" disabled={checkproduct}>
              {product.map((cat: any) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Enter quantity" }]}
            >
                <Input size="large" type="number"/>
            </Form.Item>    

          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%",background:"#d55200" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {stock.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;