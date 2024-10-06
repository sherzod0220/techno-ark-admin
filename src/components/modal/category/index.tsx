import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,notification } from "antd";
import { CategoryService } from "@service";

interface PropType {
  open: boolean,
  handleCancel:()=> void,
  category: any
}
const UpdateCreateCategoryModal = ({ open, handleCancel, category }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(category, 'category')
  useEffect(() => {
    if (category.name) {
      form.setFieldsValue({
        name: category.name,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleSubmit = async(values: any) => {
    setLoading(true);
    console.log(category.id,"id");
    console.log(category.name,"categpry name");
    
    if (category.id) {
      // Update the category
      try {
        const response = await CategoryService.update(category.id, { name: values.name });
        if (response.status === 200) {
          notification.success({
            message: "Category updated successfully!",
          });
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to update category",
          description: error?.response?.data?.message || "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Create a new category
      try {
        const response = await CategoryService.create({ name: values.name });
        if (response.status === 201) {
          notification.success({
            message: "Category added successfully!",
          });
          form.resetFields();
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to add category",
          description: error?.response?.data?.message || "Something went wrong",
        });
      }
      console.log("Creating category:", values);
    }
    setLoading(false);
    handleCancel(); // Close the modal after submission
  };

  return (
    <>
      <Modal
        open={open}
        title={category.id ? "Edit category" : "Create category"}
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
            label="Category name"
            name="name"
            rules={[{ required: true, message: "Enter category name" }]}
          >
            <Input size="large" />
          </Form.Item>

          

          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {category.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateCategoryModal;