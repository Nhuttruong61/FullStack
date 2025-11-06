import axios from "./axios";

export const getProduct = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, name, category, minPrice, maxPrice } = filters;
    let url = `/product/get-products?page=${page}&limit=${limit}`;
    
    if (name) url += `&name=${name}`;
    if (category) url += `&category=${category}`;
    if (minPrice !== undefined) url += `&minPrice=${minPrice}`;
    if (maxPrice !== undefined) url += `&maxPrice=${maxPrice}`;
    
    const res = await axios.get(url);
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
export const getProductId = async (id) => {
  try {
    const res = await axios.get(`/product/get-product/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getProductSearch = async (name) => {
  try {
    const res = await axios.get(`/product/get-products?name=${name}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post("/product/creare-product", data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`/product/delete-product/${id}`, id);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const updateProduct = async (id, data) => {
  try {
    const res = await axios.put(`/product/update-product/${id}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const createReview = async (id, data) => {
  const res = await axios.post(`/product/create-reviews/${id}`, data);
  return res.data;
};
