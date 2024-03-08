const Category = require("../models/category");
const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
const createProduct = (props) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, category, des, price, discount, color } = props;
    try {
      const res = await Product.findOne({ name: name });
      if (res) {
        reject({
          success: false,
          mes: "Tên đã tồn tại",
        });
        return;
      }
      const uploadImagesPromises = image.map(async (image) => {
        const myCloud = await cloudinary.uploader.upload(image, {
          folder: "CloneTopZone/Product",
        });
        return myCloud;
      });

      const listImage = await Promise.all(uploadImagesPromises);
      const dataCategory = await Category.findById(category);
      const product = await Product.create({
        name: name,
        category: dataCategory.name,
        des: des,
        price: price,
        discount: discount,
        color: color,
        image: listImage.map((item) => ({
          public_id: item.public_id,
          url: item.secure_url,
        })),
      });
      resolve(product);
    } catch (e) {
      reject(e);
    }
  });
};

const getProducts = (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, limit, page, category } = options;
      const skip = (page - 1) * limit;
      if (options?.name) {
        const regex = new RegExp(name, "i");
        const product = await Product.find({ name: regex })
          .skip(skip)
          .limit(limit);
        if (user) {
          resolve({
            success: true,
            product,
          });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy sản phẩm",
          });
        }
      } else if (options?.category) {
        const regex = new RegExp(category, "i");
        const product = await Product.find({ category: regex })
          .skip(skip)
          .limit(limit);
        if (product) {
          resolve({
            success: true,
            product,
          });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy sản phẩm",
          });
        }
      } else {
        const product = await Product.find().skip(skip).limit(limit);
        if (product) {
          resolve({
            success: true,
            product,
          });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy sản phẩm",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
const getProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (product) {
        resolve({
          success: true,
          product,
        });
      } else {
        resolve({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { createProduct, getProducts, getProduct };
