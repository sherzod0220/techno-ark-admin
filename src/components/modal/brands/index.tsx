import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,Select } from "antd";
import Notification from "@notification";
const { TextArea } = Input;
import { BrandService } from "@service";
const { Option } = Select;
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  brand: any,
  categories: any,
  getData: any,
}
const BrandModal = ({ open, handleCancel, brand,categories,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  useEffect(() => {
    if (brand.name) {
      form.setFieldsValue({
        name: brand.name,
        category_id: Number(brand.category_id),
        description: brand.description
      });
    } else {
      form.resetFields();
    }
  }, [brand, form]);

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async(values: any) => {
    setLoading(true);
    if (brand.id) {
      // Update the brand
        try {
          const datas = {
            name: values.name,
            categoryId: Number(values.category_id),
            description: values.description
          }            
            const response = await BrandService.update(brand.id,datas);
            getData()
            if (response?.status === 200) {
                Notification({
                    title: "Brand created successfully!",
                    type: "success"
                  });
              form.resetFields();
            }
      } catch (error: any) {
        Notification({
          title: `Failed to update brand ${error?.response?.data?.message} || "Something went wrong"`,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
        try {
            const formData: any = new FormData();
            formData.append("file", image);
            formData.append("name", values.name);
            formData.append("category_id", values.category_id);
            formData.append("description", values.description);
            console.log(values,"vll");
            
            const response = await BrandService.create(formData);
            getData()
            if (response?.status === 201) {
              Notification({
                type:"success",
                title: "Brand successfully created!"
              })
              form.resetFields();
            }
        } catch (error: any) {
              Notification({
              title: `Failed to add brand ${error?.response?.data?.message} || "Something went wrong"`,
              type: "error",
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
        title={brand.id ? "Edit brand" : "Create brand"}
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
          <Form.Item
            label="Brand name"
            name="name"
            rules={[{ required: true, message: "Enter brand name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Select a category" }]}
          >
            <Select placeholder="Select a category" size="large">
              {categories.map((cat: any) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          {
            brand.id ? '' :
          <Form.Item
            label="Brand image"
            name="file"
            rules={[{ required: true, message: "Enter brand image" }]}
          >
            <Input onChange={handleImageChange} type="file" size="large" />
          </Form.Item>
          }      

          <Form.Item 
            label="Description" 
            name="description"
            rules={[{ required: true, message: "Description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%",background:"" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {brand.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;