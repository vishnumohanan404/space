import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  FormSuccess,
  Input,
  MutedLink,
  SubmitButton,
} from "../common";
import { Marginer } from "../../components/Marginer";
import { AccountContext } from "../../context/AccountBox";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Please enter full name")
    .required("This feild is required!"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This feild is required!"),
  password: yup
    .string()
    .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required("This feild is required!"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmPassword, ...data } = values;
    const response = await axios
      .post(`${process.env.REACT_APP_API_URL}/register`, data)
      .catch((err) => {
        if (err && err.response) {
          console.log(err.response.data.message, "response");
          setError(err.response.data.message);
          console.log("Error:", err);
          setSuccess(null);
        }
      });

    if (response && response.data) {
      setError(null);
      setSuccess(response.data.message);
      formik.resetForm();
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

  console.log("Error", formik.errors);

  return (
    <BoxContainer>
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
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
          <Input
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
          <Input
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
          <Input
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
        {/* <Marginer direction="vertical" margin="1em" /> */}
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Signup
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>{" "}
      </MutedLink>
    </BoxContainer>
  );
}
