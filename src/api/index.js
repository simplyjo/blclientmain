import axios from "axios";
// import { saveAs } from 'file-saver';

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({ baseURL: "https://blastchecker.onrender.com/" });


API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});



export const checker = (wallet) => API.get(`/checker/${wallet}`);

