import React from 'react';
import { Form, Button, Space, Table, Card } from 'antd';
import { useFetchData } from '../../components/hooks'
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import Swal from 'sweetalert2'
import axios from 'axios';

interface DataType {
  id: string;
  name: string;
  is_active: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const validate = localStorage.getItem('token');
  const { data } = useFetchData<DataType[]>({
    url: 'https://mock-api.arikmpt.com/api/category',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${validate}`,
    },
  });

  const handleDelete = (id: string) => {
    axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
      headers: { Authorization: `Bearer ${validate}` },
    })
      .then((response) => {
        console.log('Delete successful', response.data);
        navigate(0)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Item Successfully deleted!'
        })
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: 'An error occurred during delete. Please try again.',
        });
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
  
      render: (isActive) => (
        <span>{isActive ? 'Active' : 'Deactive'}</span>
      ),
      filters: [
        { text: 'Active', value: true },
        { text: 'Deactive', value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, id) => (
        <>
          <Space size="middle">
            <Button type='primary' onClick={() => { navigate(`/edit-item/${id.id}`) }}>Edit</Button>
            <Button type="primary" danger ghost onClick={() => handleDelete(id.id)}>Delete</Button>
          </Space>
        </>
      ),
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you really want to Logout ?',
      width: 400,
      padding: '3em',
      color: '#716add',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'See you again !',
          width: 400,
          padding: '3em',
          color: '#716add',
        })
        navigate('/')
        localStorage.removeItem('token');
      }
    })
  }

  return (
    <Card title="LIST OF CATEGORY" style={{ padding: '20px' }}>
      <Form.Item>
        <Button type="primary" className="login-link" onClick={() => { navigate('/add-item') }} style={{ marginRight: '550px' }}>Add New Category</Button>
        <Button type="primary" className="login-link" onClick={handleLogout}>Logout</Button>
      </Form.Item>

      {data ? (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            total: data.length
          }}
          style={{ width: '800px' }}
        />
      ) : (
        <div>No data available.</div>
      )}
    </Card>
  );
};

export default Dashboard;