import axios from "axios";
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
    console.log("Progress: ",progressEvent)
  },
});
