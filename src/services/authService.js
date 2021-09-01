import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });

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
