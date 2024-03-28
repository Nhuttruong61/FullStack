import axios from "./axios";
export const createBlog = async (data) => {
  const res = await axios.post("/blog/create-blog", data);
  return res.data;
};

export const getBlogs = async () => {
  const res = await axios.get("/blog/get-blogs");
  return res.data;
};
