const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password, role, name } = data;
      const check = await User.findOne({ email: email });
      if (check) {
        reject({
          success: false,
          mes: "Email đã tồn tại",
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });

      resolve({
        success: true,
        res: newUser,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const login = (data) => {
  return new Promise(async (rosolve, reject) => {
    try {
      const { email, password } = data;
      const check = await User.findOne({ email: email });
      if (!check) {
        reject({
          success: false,
          mes: "email không chính xác",
        });
        return;
      }
      const checkPassword = bcrypt.compareSync(password, check.password);
      if (!checkPassword) {
        reject({
          success: false,
          mes: "Mật khẩu không chính xác không chính xác",
        });
        return;
      }
      const token = jwt.sign(
        { id: check.id, role: check.role },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "10d",
        }
      );
      const refesToken = jwt.sign(
        { id: check.id, role: check.role },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "15d",
        }
      );
      if (token) {
        rosolve({
          success: true,
          token,
          refesToken,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const getUserToken = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await User.findById(id)
        .select("-password")
        .populate("cart.product");
      resolve({
        res,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const getUsers = (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, limit, page } = options;
      const skip = (page - 1) * limit;
      if (name) {
        const regex = new RegExp(name, "i");
        const user = await User.find({ name: regex }).select("-password");
        // .skip(skip)
        // .limit(limit)
        if (user) {
          resolve({
            success: true,
            user,
          });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy người dùng",
          });
        }
      } else {
        const user = await User.find().select("-password");
        // .skip(skip)
        // .limit(limit)
        if (user) {
          resolve({
            success: true,
            user,
          });
        } else {
          resolve({
            success: false,
            message: "Không tìm thấy người dùng",
          });
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};

const refesToken = (id, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = jwt.sign({ id: id, role: role }, process.env.TOKEN_SECRET, {
        expiresIn: "10d",
      });
      if (token) {
        resolve({
          success: true,
          token,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        resolve({
          success: true,
          mes: "Xóa người dùng thành công",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        resolve({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      user.name = data.name;
      user.phone = data.phone;
      user.address = data.address;
      await user.save();
      resolve({
        success: true,
        user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const addProductCart = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { idProduct, color } = data;
      const user = await User.findById(id);
      if (!user) {
        resolve({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      const isProductInCart = user.cart.some(
        (item) => item.product.toString() === idProduct
      );

      if (!isProductInCart) {
        user.cart.push({
          product: idProduct,
          quantity: data.quantity || 1,
          color: color,
        });
      } else {
        reject({
          mes: "Sản phẩm đã có trong giỏ hàng",
        });
        return;
      }
      await user.save();
      const response = await User.findById(id).populate("cart.product");
      resolve({
        success: true,
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const removeProductCart = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { _id } = data;
      const user = await User.findById(id);
      if (!user) {
        resolve({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      const filter = user.cart.filter((item) => item._id.toString() !== _id);

      if (filter) {
        user.cart = filter;
      } else {
        reject({
          mes: "Sản phẩm đã có trong giỏ hàng",
        });
        return;
      }
      await user.save();
      const response = await User.findById(id).populate("cart.product");
      resolve({
        success: true,
        response,
      });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  register,
  login,
  getUsers,
  getUserToken,
  refesToken,
  deleteUser,
  updateUser,
  addProductCart,
  removeProductCart,
};
