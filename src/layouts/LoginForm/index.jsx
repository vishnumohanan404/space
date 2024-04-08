import React, { useContext } from "react";
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
import { AccountContext } from "../../context/AccountBox";
import { useFormik } from "formik";
import * as yup from "yup";
// import { loginCall } from "../../services/authService";
import { loginCall } from "../../redux";
import { connect } from "react-redux";
import { Container, Button } from "@radix-ui/themes";
import { TextField } from "../../../node_modules/@radix-ui/themes/dist/esm/components/index";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm({
  userData,
  loginCall,
  // user = userData?.user,
  error = userData.error,
  isFetching = userData.isFetching,
}) {
  const { switchToSignup } = useContext(AccountContext);
  // const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const onSubmit = async (values) => {
    loginCall(values);
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
    <Container width={"400px"} height={"340px"}>
      <FormError>{error ? "Unauthorized" : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <TextField.Root
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
          <TextField.Root
            name="password"
            type="password"
            autoComplete="on"
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
        <Marginer direction="vertical" margin="0.2em" />
        <Button type="submit" disabled={!formik.isValid}>
          {isFetching ? (
            <LoadingWrapper>
              <ClipLoader loading color="#fff" size={20} />
            </LoadingWrapper>
          ) : (
            "Login"
          )}
        </Button>
        <MutedLink href="#">Forgot your password</MutedLink>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginCall: (userCredentials) => dispatch(loginCall(userCredentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
