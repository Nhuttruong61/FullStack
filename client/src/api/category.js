import axios from "./axios";

export const getCategory = async () => {
  try {
    const res = await axios.get("/category/get-category");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
