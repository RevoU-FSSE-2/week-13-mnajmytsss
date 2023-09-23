import { Button, Card, Form, Input, Select, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const { Option } = Select;

interface AddPage {
  name?: string;
  status?: string;
}

const initialValues = {
  name: "",
  status: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  status: yup.string().required("Status is required"),
});

const AddForm: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleSubmit = async (values: AddPage) => {
    try {
      await axios.post(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          name: values?.name,
          is_active: values?.status === "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/dashboard");
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Data successfully submited!'
      })
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <Card
      title="Add New Category"
      style={{
        maxWidth: "300px",
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="control-ref"
        onFinish={formik.handleSubmit}
        style={{ width: 200 }}
      >
        <Form.Item
          name="name"
          validateStatus={
            formik.touched.name && formik.errors.name ? "error" : ""
          }
          help={formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Select Option"
            allowClear
            value={formik.values.status}
            onChange={(value) => formik.setFieldValue("status", value)}
            onBlur={formik.handleBlur}
          >
            <Option value="active">Active</Option>
            <Option value="deactive">Deactive</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              SUBMIT
            </Button>
            <Button href="/dashboard" htmlType="button">
              BACK
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;
