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
      const res = await User.findById(id).select("-password");
      resolve({
        success: true,
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
      if (options?.name) {
        const regex = new RegExp(name, "i");
        const user = await User.find({ name: regex })
          .skip(skip)
          .limit(limit)
          .select("-password");
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
        const user = await User.find()
          .skip(skip)
          .limit(limit)
          .select("-password");
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

module.exports = {
  register,
  login,
  getUsers,
  getUserToken,
  refesToken,
};