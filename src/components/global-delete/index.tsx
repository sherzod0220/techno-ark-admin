// import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
interface globaldelete {
    onConfirm: any | string;
    onCancel: () => void;
    id: any | number;
    title: any | string;
}
const GlobalDelete = ({onConfirm, onCancel, id ,title}:globaldelete) => (
  <Popconfirm
    title={title}
    okText="confirm"
    cancelText="Cancel"
    onConfirm={() => onConfirm(id)}  
    onCancel={onCancel}
  >
    <Tooltip title="Delete">
    <Button 
        style={{width:"45px", color:"red", borderColor:"red"}}
    >
        <DeleteOutlined/>
    </Button>
    </Tooltip>
  </Popconfirm>
);

export default GlobalDelete;