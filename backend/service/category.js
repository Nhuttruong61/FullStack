const Category = require("../models/category");
const createCategory = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Category.findOne({ name: name });
      if (res) {
        reject({
          success: false,
          mes: "Tên đã tồn tại",
        });
        return;
      }
      const category = Category.create({ name: name });
      resolve(category.then((res) => res));
    } catch (e) {
      reject(e);
    }
  });
};
const getCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.find();
      if (!category) {
        reject({
          success: false,
          mes: "Không tìm thấy",
        });
        return;
      }

      resolve({
        category,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const updateCategory = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findByIdAndUpdate(id, data);
      if (!category) {
        reject({
          success: false,
          mes: "Không tìm thấy",
        });
        return;
      }

      resolve({
        success: true,
        res: category,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteCategory = (id) => {
  c;
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        reject({
          success: false,
          mes: "Không tìm thấy",
        });
        return;
      }

      resolve({
        success: true,
        mes: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
