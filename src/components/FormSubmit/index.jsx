import { Button, DialogActions } from "@material-ui/core";
import { useFormikContext } from "formik";
import React from "react";

function FormSubmit({handleClose}) {
    const { submitForm } = useFormikContext();
//   console.log(`submitForm`, submitForm);
  const handleSubmit = () => {
      console.log(submitForm)
    submitForm();
    handleClose();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };
  return (
    <DialogActions>
      <Button {...configButton}>Save</Button>
    </DialogActions>
  );
}

export default FormSubmit;
