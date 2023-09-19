import { Button, Form, Input, Select, Card, Space } from "antd";

const { Option } = Select;

const AddCategory = () => {
  //   const onStatusChange = () => {};

  const onFinish = (values: unknown) => {
    console.log(values);
  };

  return (
    <Card title="Add Category">
      <Form name="control-ref" onFinish={onFinish} style={{ width: 200 }}>
        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Select a option and change input text below"
            // onChange={onStatusChange}
            allowClear
          >
            <Option value="active">Active</Option>
            <Option value="deactive">Deactive</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button htmlType="button">BACK</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategory;
