import { Button, Modal } from "antd";
import { useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { removeData } from "@token-service";

const Index = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const out = () => {
    removeData('access_token')
    // removeDataFromCookie('refresh_token')
    // removeDataFromCookie('admin_id')
    navigate('/')
    window.location.reload()
  }
  return (
    <>
      <Button
        onClick={() => setIsModalVisible(true)}
        style={{
          marginRight: "30px",
          display: "flex",
          alignItems: "center",
          color: "#d55200"
        }}
        size="large"
        type="text"
      >
        <LogoutOutlined style={{ fontSize: "20px" }} />
        <span className="font-semibold text-[20px]">Logout</span>
      </Button>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        style={{ maxWidth: "450px" }}
        title="Are you sure you want to log out?"
        footer={
          <div className="flex items-center gap-3 justify-end mt-10">
            <Button size="large" type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="large" type="primary" onClick={out}>
                Ok
            </Button>
          </div>
        }
      />
    </>
  );
};
export default Index;