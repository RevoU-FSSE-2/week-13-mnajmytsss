import { Button, Card, Form, Input, Typography } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please input your email address!"),
  password: yup
    .string()
    .required("Please input your password!")
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
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
    <Card title="Login Form">
      <Form
        name="basic"
        style={{width: '300px', height: '210px'}}
        onFinish={formik.handleSubmit}
        autoComplete="off"
      >

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
            LOGIN
          </Button>
          <Typography style={{marginBottom: '5px'}}>Or</Typography> 
          <a type="primary" className="register-link" href='/' >Register here </a>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
