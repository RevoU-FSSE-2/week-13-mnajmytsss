import { Button, Card, Form, Input, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2"

const validationSchema = yup.object().shape({
  name: yup.string()
    .min(8)
    .required("Please input your full name!"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please input your email address!"),
  password: yup
    .string()
    .required("Please input your password!")
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, "password must be alphanumeric and minimum 8 characters"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        email: values.email,
        password: values.password,
    }

    fetch('https://mock-api.arikmpt.com/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Error while register");
            }
            return response.json();
        }).then((data) => {
            console.log("Success register :", data);
            Swal.fire({
              icon: 'success',
              title: 'register success',
              text: 'register success, your account has been registered'
            })
        }).catch((error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'register failed',
              text: 'register failed, pleaser try again'
            })
        });
    } 
  });

  return (
    <Card title="Register Form"
    style={{
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
      <Form
        name="basic"
        style={{width: '270px', height: '270px'}}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          validateStatus={formik.touched.name && formik.errors.name ? "error" : ""}
          help={formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            placeholder="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="email"
          validateStatus={formik.touched.email && formik.errors.email ? "error" : ""}
          help={formik.touched.email && formik.errors.email}
        >
          <Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="password"
          validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
          help={formik.touched.password && formik.errors.password}
        >
          <Input.Password
            name="password"
            placeholder="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>

        <Form.Item style={{display: "block", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
          <Button type="primary" htmlType="submit" style={{margin: '10px'}}>
            REGISTER
          </Button>
          <Typography style={{marginBottom: '5px'}}>
          if you already have account
          </Typography>
          <a type="primary" className="login-link" href='/login'> Login here </a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
