import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { SubCategoryService } from "@service";
import { useParams } from 'react-router-dom';
import Notification from "@notification";
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  subcategory: any,
  getData: ()=> void
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
  interface ITypeValues {
    name: string
    parent_category_id: number
  }
  const handleSubmit = async(values:ITypeValues) => {
    setLoading(true);
    
    if (subcategory.id) {
      // Update the category
      try {
        const response = await SubCategoryService.update(subcategory.id, { name: values.name,parent_category_id:Number(id) });
        getData()
        if (response.status === 200) { 
          Notification({
            type:"success",
            title: "Category updated successfully!",
          });
        }
      } catch (error: any) {
        Notification({
          title: `Failed to update category ${error?.response?.data?.message} Something went wrong`,
          type:"error"
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
          Notification({
            title: "SubCategory added successfully!",
            type:"success"
          });
          form.resetFields();
        }
      } catch (error: any) {
        Notification({
          title: `Failed to add subcategory! ${error?.response?.data?.message} Something went wrong`,
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