import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
  FormError,
  LoadingWrapper,
} from "../common";
import ClipLoader from "react-spinners/ClipLoader";
import { Marginer } from "../../components/Marginer";
import { AccountContext, AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginCall } from "../../services/authService";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const { user, isFetching, authError, dispatch } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    // const response = await axios
    //   .post("http://localhost:5000/api/login", values,{withCredentials: true})
    //   .catch((err) => {
    //     if (err && err.response) {
    //       console.log(err.response.data)
    //       setError(err.response.data);
    //     }
    //   });
    loginCall(values, dispatch);
    const response = null;
    if (response) {
      console.log(response, "response");
      alert("welcome");
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <MutedLink href="#">Forgot your password</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          {isFetching ? (
            <LoadingWrapper>
              <ClipLoader loading color="#fff" size={20} />
            </LoadingWrapper>
          ) : (
            "Login"
          )}
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
