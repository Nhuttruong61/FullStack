const cloudinary = require("cloudinary").v2;
const Blog = require("../models/blog");
const createBlog = ({ title, avatar, content }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Blog.findOne({ title: title });
      if (res) {
        reject({
          success: false,
          mes: "Tiêu đề đã tồn tại",
        });
        return;
      }
      const myCloud = await cloudinary.uploader.upload(avatar, {
        folder: "CloneTopZone/Blog",
      });
      const blog = Blog.create({
        title: title,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
        content: content,
      });
      resolve(blog.then((res) => res));
    } catch (e) {
      reject(e);
    }
  });
};
const getBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.find();
      if (!blog) {
        reject({
          success: false,
          mes: "Không tìm thấy",
        });
        return;
      }

      resolve({
        blog,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.findById(id);
      if (!blog) {
        reject({
          success: false,
          mes: "Không tìm thấy",
        });
        return;
      }

      resolve({
        blog,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { createBlog, getBlogs, getBlog };
