import { useEffect, useState } from "react";
import { Button, Form, Input, Modal,notification } from "antd";
const { TextArea } = Input;
import { ProductDetailService } from "@service";
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  product: any,
  detail: any
}
const BrandModal = ({ open, handleCancel, product,detail }:PropType) => {

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  console.log(product, 'product')
  console.log(detail,"detail");
  
  useEffect(() => {
    if (product.name) {
      form.setFieldsValue({
          quantity: Number(detail?.quantity), 
          color: detail?.colors.map((item: string[]) => item), 
          description: detail?.description , 
          discount: Number(detail?.discount), 
      });
    } else {
      form.resetFields();
    }
  }, [product, form]);


  const handleSubmit = async(values: any) => {
    setLoading(true);
    // console.log(category.id,"id");
    // console.log(category.name,"categpry name");
    
    if ( detail?.id ) {
      // Update the category
      try {
        const datas = {
          quantity: Number(values.quantity), 
          colors: values.color, 
          description: values.description , 
          discount: Number(values.discount), 
          product_id: Number(product.id)
        }
            const response = await ProductDetailService.update(detail.id,datas);
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
        setLoading(false);
      }
    } else {
        try {
            const datas = {
              quantity: Number(values.quantity), 
              colors: values.color, 
              description: values.description , 
              discount: Number(values.discount), 
              product_id: Number(product.id)
            }
            const response = await ProductDetailService.create(datas);
            if (response?.status === 201) {
                notification.success({
                    message: "Brand created successfully!",
                  });
              form.resetFields();
            }
        } catch (error: any) {
              notification.error({
              message: "Failed to add brand",
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
        title={detail?.id ? "Edit brand" : "Add product detail"}
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
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
          >
            <Input size="large" type="number"/>
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: "Enter how much discount" }]}
          >
            <Input size="large" type="number"/>
          </Form.Item> 

          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Enter product color" }]}
          >
            <Input size="large" />
          </Form.Item>  

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
              style={{ width: "100%",background:"#e74c3c" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {!product.id ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;