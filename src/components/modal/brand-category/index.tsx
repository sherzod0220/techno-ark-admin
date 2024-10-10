import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,Select } from "antd";
import { BrandCategoryService } from "@service";
const { Option } = Select;
import Notification from "@notification";
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  brandCategory: any,
  categories: any,
  getData: any,
}
const BrandModal = ({ open, handleCancel, brandCategory,categories,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (brandCategory.name) {
      form.setFieldsValue({
        name: brandCategory.name,
        brand_id: brandCategory.brand_id,
      });
    } else {
      form.resetFields();
    }
  }, [brandCategory, form]);
  const handleSubmit = async(values: any) => {
    setLoading(true);   
    if (brandCategory.id) {
      // Update the brand Category
      try {
            const response = await BrandCategoryService.update(brandCategory.id,{name: values.name, brand_id: values.brand_id});
            getData()
            if (response?.status === 200) {
                Notification({
                    type:"success",
                    title: "Brand Category successfully updated!",
                  });
              form.resetFields();
            }
      } catch (error: any) {
        Notification({
          title: `Failed to update brand! ${error?.response?.data?.message} Something went wrong`,
          type:"error"
        });
      } finally {
        setLoading(false);
      }
    } else {
        try {
            const response = await BrandCategoryService.create({name: values.name, brand_id: values.brand_id});
            getData()
            if (response?.status === 201) {
                Notification({
                    title: "Brand Category successfully created!",
                    type:"success"
                  });
              form.resetFields();
            }
        } catch (error: any) {
              Notification({
              type:"error",
              title:`Failed to add brand category ${error?.response?.data?.message} Something went wrong`,
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

        title={brandCategory.id ? "Edit Brand Category" : "Create Brand Category"}
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
            label="Brand Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand_id"
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
   
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%",background:"#d55200" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {brandCategory.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;