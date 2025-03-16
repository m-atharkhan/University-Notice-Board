import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const fetchNotices = () => API.get("/notices");
export const createNotice = (noticeData) => API.post("/notices", noticeData);
export const deleteNotice = (id) => API.delete(`/notices/${id}`);
export const signup = (userData) => API.post("/users/register", userData);
export const login = (userData) => API.post("/users/login", userData, {
    headers: {
        "Content-Type": "application/json",
    }});
