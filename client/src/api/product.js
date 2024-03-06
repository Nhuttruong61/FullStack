import axios from "./axios";

export const getProduct = async () => {
  try {
    const res = await axios.get("/product/get-products");
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getProductCategory = async (category) => {
  try {
    const res = await axios.get(`/product/get-products?category=${category}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
