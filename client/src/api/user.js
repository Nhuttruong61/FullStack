import axios from "./axios";
export const login = async (data) => {
  const res = await axios.post("/user/login", data);
  return res.data;
};
export const loginGoogle = async (data) => {
  const res = await axios.post("/user/login-google", data);
  return res.data;
};
export const register = async (data) => {
  const res = await axios.post("/user/register", data);
  return res.data;
};
export const userTK = async (data) => {
  const res = await axios.get("/user/get-user-token", { params: data });
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

export const updateUser = async (id, data) => {
  const res = await axios.put(`/user/update-user/${id}`, data);
  return res.data;
};

export const addCart = async (id, data) => {
  const res = await axios.patch(`/user/add-card/${id}`, data);
  return res.data;
};

export const removeCart = async (id, data) => {
  const res = await axios.patch(`/user/remove-card/${id}`, data);
  return res.data;
};

// Wishlist API calls
export const addWishlist = async (id, data) => {
  const res = await axios.patch(`/user/add-wishlist/${id}`, data);
  return res.data;
};

export const removeWishlist = async (id, data) => {
  const res = await axios.patch(`/user/remove-wishlist/${id}`, data);
  return res.data;
};

export const getWishlist = async (id) => {
  const res = await axios.get(`/user/get-wishlist/${id}`);
  return res.data;
};
