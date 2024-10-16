import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Notification from "@notification";
import { AdsService } from "@service";
import { HappyProvider } from "@ant-design/happy-work-theme";
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  category: any,
  getData:any,
}
const BrandModal = ({ open, handleCancel, category,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  console.log(category, 'category')
  useEffect(() => {
    if (category.name) {
      form.setFieldsValue({
        name: category.name,
        category_id: Number(category.category_id),
        description: category.description
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleImageChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async(values: any) => {
    setLoading(true);
    try {
        const formData: any = new FormData();
        formData.append("file", image);
        formData.append("position", values.position);
        console.log(values,"vll");
        
        const response = await AdsService.create(formData);
        getData()
        if (response?.status === 201) {
            Notification({
                type: "success",
                title: "Ad successfully added!",
              });
          form.resetFields();
        }
    } catch (error: any) {
          Notification({
            type: "error",
          title: `Failed to add ad! ${error?.response?.data?.message}, Something went wrong`,
        });
    }
    setLoading(false);
    handleCancel(); // Close the modal after submission
  };

  return (
    <>
      <Modal
        open={open}
        title="Create Ad"
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
            label="Position"
            name="position"
            rules={[{ required: true, message: "Enter ads postion" }]}
          >
            <Input size="large" />
          </Form.Item>   
          <Form.Item
            label="Brand image"
            name="file"
            rules={[{ required: true, message: "Enter brand image" }]}
          >
            <Input onChange={handleImageChange} type="file" size="large" />
          </Form.Item>
          <Form.Item>
            <HappyProvider>
              <Button
                size="large"
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Add
              </Button>
            </HappyProvider>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;