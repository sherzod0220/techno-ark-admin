import { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
const { TextArea } = Input;
import { ProductDetailService } from "@service";
import Notification from "@notification";
import { HappyProvider } from "@ant-design/happy-work-theme";
interface PropType {
  open: boolean,
  handleCancel:()=> void,
  product: any,
  detail: any,
  getProduct:any,
}
const BrandModal = ({ open, handleCancel, product,detail,getProduct }:PropType) => {    
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();  
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
            getProduct()
            if (response?.status === 200) {
                Notification({
                    type:"success",
                    title: "Product detail successfully updated!",
                  });
              form.resetFields();
            }
      } catch (error: any) {
        Notification({
            type:"error",
            title: `Failed to update product detail! ${error?.response?.data?.message}, Something went wrong`,
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
            getProduct()
            if (response?.status === 201) {
                Notification({
                    type:"success",
                    title: "Product Detail added successfully!",
                  });
              form.resetFields();
            }
        } catch (error: any) {
              Notification({
                type:"error",
                title: `Failed to add brand! ${error?.response?.data?.message},Something went wrong`,
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
        title={detail?.id ? "Edit prduct detail" : "Add product detail"}
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
            <HappyProvider>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {detail?.id ? "Update" : "Add"}
            </Button>
            </HappyProvider>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BrandModal;