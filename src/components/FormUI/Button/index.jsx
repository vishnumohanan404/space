import React from "react";
import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, handleClose, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    // console.log(`submit`, submitForm);
    try {
        // handleClose();
      submitForm();
    } catch (error) {
        console.log(`error in submit form`, error);
    }
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
    type: "submit",
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
