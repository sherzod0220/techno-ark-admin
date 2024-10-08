import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,notification } from "antd";
import { SubCategoryService } from "@service";
import { useParams } from 'react-router-dom';

interface PropType {
  open: boolean,
  handleCancel:()=> void,
  subcategory: any,
  getData: any
}
const UpdateCreateSubCategoryModal = ({ open, handleCancel, subcategory,getData }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const {id} = useParams()

  
  useEffect(() => {
    if (subcategory.name) {
      form.setFieldsValue({
        name: subcategory.name,
      });
    } else {
      form.resetFields();
    }
  }, [subcategory, form]);

  const handleSubmit = async(values: any) => {
    setLoading(true);
    
    if (subcategory.id) {
      // Update the category
      try {
        const response = await SubCategoryService.update(subcategory.id, { name: values.name,parent_category_id:Number(id) });
        getData()
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
        const response = await SubCategoryService.create({parent_category_id: Number(id), name: values.name });
        getData()
        if (response.status === 201) {
          notification.success({
            message: "SubCategory added successfully!",
          });
          form.resetFields();
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to add subcategory",
          description: error?.response?.data?.message || "Something went wrong",
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

        title={subcategory.id ? "Edit subcategory" : "Create subcategory"}
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
            label="Sub Category name"
            name="name"
            rules={[{ required: true, message: "Enter subcategory name" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%",background:"#d55200" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {subcategory.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCreateSubCategoryModal;