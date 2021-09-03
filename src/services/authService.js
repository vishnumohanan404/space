import {api} from '../api.config'


export const loginCall = async (userCredentials, dispatch) => {
    console.log("Dispatch:",dispatch,userCredentials)
    console.log("User credentials:",userCredentials)
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await api.post(`/login`, userCredentials);
    console.log("Res: ",res)
    const userData = await api.get(`/`)
    console.log("Userdata in authservice",userData)
    dispatch({ type: "LOGIN_SUCCESS", payload: userData });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
