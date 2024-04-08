import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  MutedLink,
} from "../common";
import { Marginer } from "../../components/Marginer";
import { AccountContext } from "../../context/AccountBox";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Button, TextField } from "@radix-ui/themes";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Please enter full name")
    .required("This feild is required!"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This feild is required!"),
  password: yup.string().min(8).required("This feild is required!"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => val?.length > 0,
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}/register`, data)
      .catch((err) => {
        if (err && err.response) {
          toast.error(err.response.data.message);
        }
      });

    if (response && response.data) {
      toast.success(response.data.message);
      formik.resetForm();
      switchToSignin();
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  console.log("Error", formik.errors.password);

  return (
    <Container width={"400px"} height={"340px"}>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <TextField.Root
            name="fullName"
            type="text"
            placeholder="Fullname"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.fullName && formik.errors.fullName
              ? formik.errors.fullName
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <TextField.Root
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FieldError>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <TextField.Root
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="on"
          />
          <FieldError>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </FieldError>
        </FieldContainer>
        <FieldContainer>
          <TextField.Root
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            autoComplete="on"
          />
          <FieldError>
            {formik.touched.confirmPassword && formik.errors.confirmPassword
              ? formik.errors.confirmPassword
              : ""}
          </FieldError>
        </FieldContainer>
        <Marginer direction="vertical" margin="0.2em" />
        <Button type="submit" disabled={!formik.isValid}>
          Signup
        </Button>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>{" "}
      </MutedLink>
    </Container>
  );
}
