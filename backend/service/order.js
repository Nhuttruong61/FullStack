const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");
const LoyaltyPointService = require("./loyaltyPoint");
const Settings = require("../models/settings");

const createOrder = (props) => {
  return new Promise(async (resolve, reject) => {
    const { user, products, totalPrice, finalPrice, discountAmount, promoCode, payments } = props;
    try {
      for (const item of products) {
        const product = await Product.findById(item.product);
        if (!product) {
          reject({
            success: false,
            mes: `Sản phẩm ${item.product} không tồn tại`,
          });
          return;
        }

        const selectedColor = product.color.find((c) => c.color === item.color);
        if (!selectedColor || selectedColor.quantity < item.quantity) {
          reject({
            success: false,
            mes: `Sản phẩm ${product.name} màu ${item.color} không đủ số lượng`,
          });
          return;
        }
      }

      const res = await Order.create({
        user: user._id,
        products: products,
        totalPrice: parseFloat(totalPrice),
        finalPrice: parseFloat(finalPrice || totalPrice),
        discountAmount: parseFloat(discountAmount || 0),
        promoCode: promoCode || null,
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

      if (promoCode) {
        const PromoCode = require("../models/promoCode");
        const promo = await PromoCode.findOne({ code: promoCode });
        if (promo) {
          const userUsageIndex = promo.usedBy.findIndex(
            (u) => u.user.toString() === user._id.toString()
          );
          if (userUsageIndex >= 0) {
            promo.usedBy[userUsageIndex].usedCount += 1;
            promo.usedBy[userUsageIndex].usedAt = new Date();
          } else {
            promo.usedBy.push({
              user: user._id,
              usedCount: 1,
              usedAt: new Date(),
            });
          }
          promo.usageCount += 1;
          await promo.save();
        }
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
          .populate({
            path: "user",
            select: "name phone address email"
          })
          .populate({
            path: "products.product",
            select: "name price image color"
          })
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .lean()
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
      const res = await Order.findById(id).populate("products.product");
      if (!res) {
        reject({
          success: false,
          mes: "Không tìm thấy đơn hàng",
        });
        return;
      }

      if (res.status !== "Chờ xử lý") {
        reject({
          success: false,
          mes: "Chỉ có thể hủy đơn hàng chờ xử lý",
        });
        return;
      }

      for (const el of res.products) {
        const product = await Product.findById(el.product._id);
        if (product) {
          const selectedColor = product.color.find((c) => c.color === el.color);
          if (selectedColor) {
            selectedColor.quantity += el.quantity;
          }
          product.sold_out -= el.quantity;
          await product.save();
        }
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

      if (order.status === "Chờ xử lý" && data.status === "Đã xác nhận") {
        let checkquantity = true;
        for (const el of order.products) {
          const product = await Product.findById(el.product._id);
          const selectedColor = product.color.find((c) => c.color === el.color);
          if (!selectedColor || selectedColor.quantity < el.quantity) {
            checkquantity = false;
            break;
          }
        }
        if (!checkquantity) {
          reject({
            success: false,
            mes: "không đủ số lượng",
          });
          return;
        }

        for (const el of order.products) {
          const product = await Product.findById(el.product._id);
          const selectedColor = product.color.find((c) => c.color === el.color);
          if (selectedColor) {
            selectedColor.quantity -= el.quantity;
          }
          product.sold_out += el.quantity;
          await product.save();
        }
      }

      const previousStatus = order.status;
      order.status = data.status;
      await order.save();

      if (previousStatus !== "Đã giao" && data.status === "Đã giao") {
        try {
          const settings = await Settings.findOne();
          if (settings?.features?.loyaltyProgram?.enabled) {
            const orderValue = order.finalPrice || order.totalPrice;
            await LoyaltyPointService.addPointsFromOrder(
              order.user,
              orderValue,
              order._id
            );
          }
        } catch (loyaltyError) {
          console.log("Error adding loyalty points:", loyaltyError);
        }
      }

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
