// import { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
import { Button,Upload, Drawer, Form, Input, Select } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { CategoryService, BrandService, BrandCategoryService, ProductsService } from "@service";
import { useEffect } from 'react';
import { useState } from 'react';
const { Option } = Select;

interface PropType {
    open: boolean,
    handleCancel:()=> void,
    category: any
  }
const Index = ({open,handleCancel,category}:PropType) => {
console.log(category);
const [categories, setCategories] = useState([]);
const [brands, setBrands] = useState([]);
const [categoryid,setCategoryid] = useState(0)
const [checkbrand,setCheckbrands] = useState(true)

const [brandcategories, setBrandCategories] = useState([]);
const [brandid,setBrandid] = useState(0)
const [checkbrandcategory,setCheckBrandCategory] = useState(true)

const [form] = Form.useForm();

const [image, setImage] = useState([]);

  // =========== categories ======================================
  const getCategories = async () => {
    try {
      const response = await CategoryService.get({ page: 1, limit: 100 });
      if (response.status === 200) {
        setCategories(response?.data?.data?.categories);
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
    setCheckBrandCategory(false)
  };

   // =========== Brand ======================================
   const getBrands = async () => {
    try {
      const response = await BrandService.get_by_id(categoryid,{ page: 1, limit: 100 });
      if (response.status === 200) {
        setBrands(response?.data?.data?.brands);  
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBrands();
  }, [categoryid]);

  // =========== Brand Category======================================
  const getBrandCategory = async () => {
    try {
      const response = await BrandCategoryService.get_by_id(brandid,{ page: 1, limit: 100 });
      if (response.status === 200) {
        setBrandCategories(response?.data?.data?.brandCategories);  
        // setTotal(response?.data?.data?.count); // Assuming the total count is provided by the API
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBrandCategory();
  }, [brandid]);

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async(values: any) => {
    // setBootonLoding(true);
    
    if (category.id) {
      // Update the category
      try {
            const datas = {
              name: values.name,
              price: Number(values.price),
              category_id: Number(values.category_id),
              brand_category_id: Number(values.brand_category_id),
              brand_id: Number(values.brand_id)
            }
            const response = await ProductsService.update(category.id,datas);
            // console.log(category,"kktt");
            console.log(values,"this is values");
            console.log(values.category_id,"vll");
            
            if (response?.status === 201) {
                notification.success({
                    message: "Brand created successfully!",
                  });
              form.resetFields();
            }
      } catch (error: any) {
        notification.error({
          message: "Failed to update brand",
          description: error?.response?.data?.message || "Something went wrong",
        });
      } finally {
        // setBootonLoding(false);
      }
    } else {
        try {
            const formData: any = new FormData();
            formData.append("files", image);           // file
            formData.append("name", values.name);     // name
            formData.append("price", values.price);   // price
            formData.append("category_id", values.category_id);  // category_name
            formData.append("brand_category_id", values.brand_category_id); //brand_category_id
            formData.append("brand_id", values.brand_id); //brand_id
            console.log(values,"vll");
            
            const response = await ProductsService.create(formData);
            if (response?.status === 201) {
                notification.success({
                    message: "Brand created successfully!",
                  });
              form.resetFields();
            //   getProducts()
            }
        } catch (error: any) {
              notification.error({
              message: "Failed to add brand",
              description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }
    // setBootonLoding(false);
    handleCancel() 
    
};

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={handleCancel}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
           form={form}
          name="categoryForm"
          style={{ width: "100%", marginTop: "20px" }}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <div className="w-full grid grid-cols-2 gap-[20px]">
            {/* name | price */}
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter Price" }]}
            >
              <Input
                type="number"
                style={{ width: "100%" }}
                placeholder="Please enter price"
              />
            </Form.Item>

            {/*select category name  |  select brand name*/}
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

            {/* BRAND CATEGORY   |   PRODUCT IMAGE */}
            <Form.Item
              name="brand_category_id"
              label="Brand Category"
              rules={[
                { required: true, message: "Please select Brand Category" },
              ]}
            >
              <Select placeholder="Please select brand category" disabled={checkbrandcategory}>
              {brandcategories.map((cat: any) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {
              category.id ?
            <Form.Item
              label="Product image"
              name="files"
              rules={[{ required: true, message: "Select product image" }]}
            >
              <Upload
                beforeUpload={() => false} // Prevent auto upload
                listType="picture"
                multiple
                onChange={handleImageChange}
              >
                <Button size="large" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item> : ''
            }
          </div>

          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            //   loading={bootonLoding}
            >
              {
                !category.id ? "Add Product" : "Edit Product"
              }
            </Button>
          </Form.Item>
        </Form>
        {/* <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            //   loading={loading}
            >
              {category.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form> */}
      </Drawer>
    </>
  );
};

export default Index;