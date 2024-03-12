const Order = require("../models/order");
const Product = require("../models/product");

const createOrder = (props) => {
  return new Promise(async (resolve, reject) => {
    const { user, product, totalPrice } = props;
    try {
      const res = await Order.create({
        user: user,
        product: product,
        totalPrice: totalPrice,
      });
      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const getOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.find().populate("user");
      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.find({ user: id });
      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
const cancleOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.findById(id);
      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      res.status = "Đã hủy";
      await res.save();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
const deleteOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.findById(id);
      if (!res) {
        reject({
          success: false,
          mes: "Không tìm thấy đơn hàng",
        });
        return;
      }
      await Order.findByIdAndDelete(id);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
const updateStatusOrder = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(id);
      if (!order) {
        reject({
          success: false,
          mes: "Không tìm thấy đơn hàng",
        });
        return;
      }
      if (order.status == "Chờ xử lý") {
        let checkQuality = true;
        order.product.forEach(async (el) => {
          const product = await Product.findById(el.id);
          const selectedColor = product.color.find((c) => c.color === el.color);
          if (selectedColor.quality < el.quality) {
            checkQuality = false;
          }
        });
        if (!checkQuality) {
          reject({
            success: false,
            mes: "không đủ số lượng",
          });
          return;
        }
        order.product.forEach(async (el) => {
          const product = await Product.findById(el.id);
          const selectedColor = product.color.find((c) => c.color === el.color);
          selectedColor.quality -= el.quality;
          product.sold_out += el.quality;
          await product.save();
        });
      }
      order.status = data.status;
      await order.save();
      resolve(order);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getOrders,
  getOrderUser,
  cancleOrder,
  deleteOrder,
  updateStatusOrder,
};
