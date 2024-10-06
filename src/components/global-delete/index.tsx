// import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
interface globaldelete {
    onConfirm: any | string;
    onCancel: () => void;
    id: any | number;
    title: any | string;
}
const GlobalDelete = ({onConfirm, onCancel, id ,title}:globaldelete) => (
  <Popconfirm
    title={title}
    okText="ok"
    cancelText="Cancel"
    onConfirm={() => onConfirm(id)}  
    onCancel={onCancel}
  >
    <Button 
        style={{width:"45px", color:"red", borderColor:"red"}}
    >
        <DeleteOutlined/>
    </Button>
  </Popconfirm>
);

export default GlobalDelete;