const UserSerevice = require("../service/user");

const rerister = async (req, res) => {
  try {
    const { email } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const check = reg.test(email);
    if (!check)
      return res.status(403).json({
        success: false,
        mes: "Định dạng email không hợp lệ",
      });
    const response = await UserSerevice.register(req.body);
    if (response)
      return res.status(200).json({
        success: true,
        response,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const check = reg.test(email);
    if (!check)
      return res.status(403).json({
        success: false,
        mes: "Định dạng email không hợp lệ",
      });
    const response = await UserSerevice.login(req.body);
    if (response) {
      res.cookie("refesToken", response.refesToken);
      return res.status(200).json({
        success: true,
        token: response.token,
      });
    }
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

const getUserToken = async (req, res) => {
  try {
    const response = await UserSerevice.getUserToken(req.user.id);
    if (response)
      return res.status(200).json({
        success: true,
        user: response.res,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const { name, page } = req.query;
    let limit = process.env.LIMIT;
    const options = {
      page,
      limit,
    };
    if (name) {
      options.name = name;
    }
    const response = await UserSerevice.getUsers({ ...options });
    if (response)
      return res.status(200).json({
        success: true,
        users: response.user,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const refesToken = async (req, res) => {
  try {
    const { id, role } = req.user;
    const response = await UserSerevice.refesToken(id, role);
    if (response)
      return res.status(200).json({
        success: true,
        response,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const deleteleteUser = async (req, res) => {
  try {
    const response = await UserSerevice.deleteUser(req.params.id);
    if (response)
      return res.status(200).json({
        success: true,
        user: response.res,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await UserSerevice.updateUser(req.params.id, req.body);
    if (response)
      return res.status(200).json({
        success: true,
        user: response.user,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

const addProductCart = async (req, res) => {
  try {
    const response = await UserSerevice.addProductCart(req.params.id, req.body);
    if (response)
      return res.status(200).json({
        success: true,
        user: response.response,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const removeProductCart = async (req, res) => {
  try {
    const response = await UserSerevice.removeProductCart(
      req.params.id,
      req.body
    );
    if (response)
      return res.status(200).json({
        success: true,
        user: response.response,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
module.exports = {
  rerister,
  login,
  getUsers,
  getUserToken,
  refesToken,
  addProductCart,
  deleteleteUser,
  updateUser,
  removeProductCart,
};
