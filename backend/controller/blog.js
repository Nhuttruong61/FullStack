const BlogSerevice = require("../service/blog");
const createBlog = async (req, res) => {
  try {
    const response = await BlogSerevice.createBlog(req.body);
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
const getBlogs = async (req, res) => {
  try {
    const response = await BlogSerevice.getBlogs();
    const formattedBlogs = response.blog.map((blog) => ({
      id: blog._id,
      title: blog.title,
      avatar: blog.avatar,
      content: blog.content.toString("utf-8"),
    }));

    if (response)
      return res.status(200).json({
        success: true,
        blog: formattedBlogs,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params.id;
    const response = await BlogSerevice.getBlog(id);
    if (response)
      return res.status(200).json({
        success: true,
        blog: response.blog,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogSerevice.updateBlog(id, req.body);
    if (response)
      return res.status(200).json({
        success: true,
        category: response.category,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await BlogSerevice.deleteBlog(id);
    if (response)
      return res.status(200).json({
        success: true,
        mes: "Xóa thành công",
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};
module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
