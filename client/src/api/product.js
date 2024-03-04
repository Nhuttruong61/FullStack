import axios from "./axios";

export const getProduct = async () => {
  try {
    const res = await axios.get("/product/get-products");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
