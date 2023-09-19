import React from 'react';
import { Button, Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  name: string;
  status: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
        <span>{status ? 'Active' : 'Deactive'}</span>
      ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space>
        <a><Button>EDIT</Button></a>
        <a><Button>DELETE</Button></a>
        </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: '1djfsdkjfnsdkjfnsdfunsdfuwierweuhru223wehf237h',
    name: 'John Brown',
    status: true,
  }
];

const Category: React.FC = () => <Table columns={columns} dataSource={data} />;

export default Category;