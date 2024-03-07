import axios from "./axios";
export const login = async (data) => {
  const res = await axios.post("/user/login", data);
  return res.data;
};
export const register = async (data) => {
  const res = await axios.post("/user/register", data);
  return res.data;
};
export const userTK = async (data) => {
  const res = await axios.get("/user/get-user-token", data);
  return res.data;
};
