const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rerister = (data) => {
  return new Promise(async (rosolve, reject) => {
    try {
      const { email, password, role } = data;
      const check = await User.findOne({ email: email });
      if (check) {
        reject({
          status: false,
          mes: "email đã tồn tại",
        });
        return;
      }
      const hasPassword = bcrypt.hashSync(password, 10);
      const res = await User.create({
        email: email,
        password: hasPassword,
        role: role,
      });
      if (res) {
        rosolve({
          status: true,
          res,
        });
      }
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
          status: false,
          mes: "email không chính xác",
        });
        return;
      }
      const checkPassword = bcrypt.compareSync(password, check.password);
      if (!checkPassword) {
        reject({
          status: false,
          mes: "Mật khẩu không chính xác không chính xác",
        });
        return;
      }
      const token = jwt.sign(
        { id: check.id, role: check.role },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "15d",
        }
      );
      if (token) {
        rosolve({
          status: true,
          token,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
const getUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.find();
      if (user) {
        resolve({
          status: true,
          user,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  rerister,
  login,
  getUser,
};
