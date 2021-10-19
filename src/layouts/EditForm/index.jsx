import React from "react";
// import Header from './Components/Header';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, DialogActions, Grid, Typography } from "@material-ui/core";
import TextfieldWrapper from "../../components/FormUI/TextField";
import Select from "../../components/FormUI/Select";
import FormSubmit from "../../components/FormSubmit";
// import DateTimePicker from './Components/FormsUI/DataTimePicker';
// import Checkbox from './Components/FormsUI/Checkbox';
import Button from "../../components/FormUI/Button";
import countries from "./data/countries.json";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateProfileInfo } from "../../redux/user/UserAction";
import { MoonLoader } from "react-spinners";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FORM_VALIDATION = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  phone: Yup.string().matches(phoneRegExp, "Enter a valid phone number"),
  age: Yup.number(),
  description: Yup.string(),
  education: Yup.string(),
  work: Yup.string(),
  from: Yup.string(),
  fromCountry: Yup.string(),
  livesIn: Yup.string(),
  livesInCountry: Yup.string(),
});

const EditForm = ({ handleClose }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const INITIAL_FORM_STATE = {
    userId: user._id,
    fullName: user.fullName,
    phone: user.phone ? user.phone : "",
    email: user.email,
    age: user.age ? user.age : "",
    description: user.description ? user.description : "",
    education: user.education ? user.education : "",
    work: user.work ? user.work : "",
    from: user.from ? user.from : "",
    livesIn: user.livesIn ? user.livesIn : "",
    livesInCountry: user.livesInCountry ? user.livesInCountry : "",
    fromCountry: user.fromCountry ? user.fromCountry : "",
  };

  const handleSubmit = (values) => {
    dispatch(updateProfileInfo(values));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              // validator={() => ({})}
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Personal Info</Typography>
                  </Grid>
                  <input type="text" hidden name="userId" />
                  <Grid item xs={6}>
                    <TextfieldWrapper name="fullName" label="Fullname" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextfieldWrapper name="phone" label="Phone" />
                  </Grid>

                  <Grid item xs={10}>
                    <TextfieldWrapper name="email" label="Email" />
                  </Grid>
                  <Grid item xs={2}>
                    <Select
                      name="age"
                      label="Age"
                      options={[...Array(100).keys()]}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>Bio</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextfieldWrapper
                      name="description"
                      label="Tell us about yourself"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextfieldWrapper name="education" label="Education" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextfieldWrapper name="work" label="Work" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextfieldWrapper name="from" label="From" />
                  </Grid>

                  <Grid item xs={6}>
                    <Select
                      name="fromCountry"
                      label="Country"
                      options={countries}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextfieldWrapper name="livesIn" label="Lives In" />
                  </Grid>

                  <Grid item xs={6}>
                    <Select
                      name="livesInCountry"
                      label="Country"
                      options={countries}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button handleClose={handleClose}>
                      {userProfile.updateLoading ? <MoonLoader /> : "Save"}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default EditForm;
