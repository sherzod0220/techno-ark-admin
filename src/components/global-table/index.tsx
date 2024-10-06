import React from 'react';
import { Table as AntdTable } from 'antd';
import type { TablePaginationConfig } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
}

interface CustomTableProps {
  data: DataType[];
  pagination: TablePaginationConfig;
  onChange: (pagination: TablePaginationConfig) => void;
  columns: any[]
}

const Table: React.FC<CustomTableProps> = ({ data, pagination, onChange,columns }) => {
  return (
    <AntdTable
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={(pagination) => onChange(pagination)}
      rowKey="key"
      bordered
    />
  );
};

export default Table;