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
export const resfesToken = async () => {
  const res = await axios.get("/user/refesToken");
  return res.data;
};

export const getUsser = async () => {
  const res = await axios.get("/user/get-users");
  return res.data;
};
export const deleteUser = async (id) => {
  const res = await axios.delete(`/user/delete/${id}`);
  return res.data;
};
