const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

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
      const product = await Product.create({
        name: name,
        category: category,
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
      const { name, limit, category } = options;
      if (name) {
        const regex = new RegExp(name, "i");
        const product = await Product.find({ name: regex }).populate(
          "category"
        );
        // .skip(skip);
        // .limit(limit);
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
      } else if (category) {
        const product = await Product.find({ category: category }).populate(
          "category"
        );
        // .skip(skip);
        // .limit(limit);
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
        const product = await Product.find().populate("category");
        // .limit(limit);

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
      const product = await Product.findById(id).populate("category");
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

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        resolve({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
        return;
      }
      for (const el of product.image) {
        await cloudinary.uploader.destroy(el.public_id);
      }
      await Product.findByIdAndDelete(id);
      resolve({
        success: true,
        message: "Sản phẩm đã được xóa thành công",
      });
    } catch (err) {
      reject(err);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        resolve({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
        return;
      }
      if (!data?.image[0]) {
        for (const el of product.image) {
          await cloudinary.uploader.destroy(el.public_id);
        }
        const uploadImagesPromises = data.image.map(async (image) => {
          const myCloud = await cloudinary.uploader.upload(image, {
            folder: "CloneTopZone/Product",
          });
          return myCloud;
        });
        const listImage = await Promise.all(uploadImagesPromises);
        product.image = listImage.map((item) => ({
          public_id: item.public_id,
          url: item.secure_url,
        }));
      }
      product.name = data.name;
      product.category = data.category;
      product.des = data.des;
      product.price = data.price;
      product.discount = data.discount;
      product.color = data.color;
      await product.save();
      resolve({
        product,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const createReviews = (productId, data, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { comment, rating } = data;
      const user = await User.findById(userId).select("name");
      const product = await Product.findById(productId);
      if (!product) {
        reject({
          success: false,
          message: "Không tìm thấy sản phẩm",
        });
        return;
      }
      const orders = await Order.find({
        user: userId,
        status: "Đã giao",
      }).populate("products.product");
      const checkOrder = orders.some((order) =>
        order.products.some((orderProduct) =>
          orderProduct.product.equals(product._id)
        )
      );
      if (!checkOrder) {
        reject({
          success: false,
          message: "Bạn chưa mua sản phẩm này",
        });
        return;
      }
      product.reviews.unshift({
        user: user,
        rating: rating,
        comment: comment,
      });
      const total =
        product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
        product.reviews.length;
      product.ratings = total;
      await product.save();
      resolve({
        success: true,
        product,
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createReviews,
};
