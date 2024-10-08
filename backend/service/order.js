const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

const createOrder = (props) => {
  return new Promise(async (resolve, reject) => {
    const { user, products, totalPrice, payments } = props;
    try {
      const res = await Order.create({
        user: user._id,
        products: products,
        totalPrice: totalPrice,
        payments: payments,
      });
      const response = await User.findById(user._id);
      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      response.cart = [];
      await response.save();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

const getOrders = {
  getOrders: async ({ page, limit }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const skip = (page - 1) * limit;
        const orders = await Order.find()
          .populate("products.product")
          .populate("user")
          .skip(skip)
          .limit(limit)
          .exec();
        if (!orders) {
          reject({
            success: false,
            mes: "Có lỗi xảy ra",
          });
          return;
        }

        resolve(orders);
      } catch (e) {
        reject({
          success: false,
          mes: e.message,
        });
      }
    });
  },
  countOrders: async () => {
    try {

      return await Order.countDocuments();
    } catch (e) {
      throw new Error("Có lỗi xảy ra khi đếm số lượng đơn hàng.");
    }
  },
};

const getOrderUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.find({ user: id }).populate("products.product");
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
const getOrdersDasboard = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Order.find().select('-user');

      if (!res) {
        reject({
          success: false,
          mes: "Có lỗi xảy ra",
        });
        return;
      }
      resolve(res);
    } catch (e) {
      console.log(e)
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
      const order = await Order.findById(id).populate({
        path: "products.product",
        model: "Product",
        select: "name price color",
      });
      if (!order) {
        reject({
          success: false,
          mes: "Không tìm thấy đơn hàng",
        });
        return;
      }
      if (order.status == "Chờ xử lý") {
        let checkquantity = true;
        order.products.forEach(async (el) => {
          const product = await Product.findById(el.product);
          const selectedColor = product.color.find((c) => c.color === el.color);
          if (selectedColor.quantity < el.quantity) {
            checkquantity = false;
          }
        });
        if (!checkquantity) {
          reject({
            success: false,
            mes: "không đủ số lượng",
          });
          return;
        }
        order.products.forEach(async (el) => {
          const product = await Product.findById(el.product);

          const selectedColor = product.color.find((c) => c.color === el.color);
          selectedColor.quantity -= el.quantity;
          product.sold_out += el.quantity;
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
  getOrdersDasboard
};
