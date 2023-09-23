import React, { useEffect, useState } from 'react';
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

interface DataProfile {
  name?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const validate = localStorage.getItem('token');

  if (!validate) {
    navigate('/')
  }

  const [dataList, setData] = useState<DataType[]>([]);

  const { data } = useFetchData<DataProfile>({
    url: 'https://mock-api.arikmpt.com/api/user/profile',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${validate}`,
    },
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    axios.get('https://mock-api.arikmpt.com/api/category',
      { headers: { Authorization: `Bearer ${validate}` } })
      .then((response) => {
        console.log('Get successful', response.data.data);
        setData(response.data.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (id: string) => {
    axios.delete(`https://mock-api.arikmpt.com/api/category/${id}`, {
      headers: { Authorization: `Bearer ${validate}` },
    })
      .then((response) => {
        console.log('Delete successful', response.data);
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
          title: 'Data successfully removed'
        })
        fetchData();
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
            <Button type='primary' onClick={() => { navigate(`/edit-item/${id.id}`) }}>Edit Status</Button>
            <Button type="primary" danger ghost onClick={() => handleDelete(id.id)}>Delete</Button>
          </Space>
        </>
      ),
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you really want to Logout ?',
      width: 600,
      padding: '3em',
      color: '#7D7C7C',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'See you again !',
          width: 600,
          padding: '3em',
          color: '#7D7C7C',
        })
        window.location.replace('/login')
        localStorage.removeItem('token');
      }
    })
  }

  return (
    <Card title="DASHBOARD CATEGORY" style={{
      maxWidth: "1000px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Form.Item>
        <Button type="primary" className="login-link" onClick={() => { navigate('/add-item') }} style={{ marginRight: '550px' }}>Add New Category</Button>
        <Button type="primary" className="login-link" onClick={handleLogout} >Logout</Button>
      </Form.Item>
      <div>
        name: {data?.name}
      </div>
      {dataList ? (
        <Table
          dataSource={dataList}
          columns={columns}
          pagination={{
            pageSize: 5,
            total: dataList.length
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