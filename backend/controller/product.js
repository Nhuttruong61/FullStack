const ProductSerevice = require("../service/product");
const createProduct = async (req, res) => {
  try {
    const response = await ProductSerevice.createProduct(req.body);
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

const getProducts = async (req, res) => {
  try {
    const { name, page, category } = req.query;
    let limit = process.env.LIMIT;
    const options = {
      page,
      limit,
      category,
    };
    if (name) {
      options.name = name;
    }
    const response = await ProductSerevice.getProducts({ ...options });
    if (response)
      return res.status(200).json({
        success: true,
        products: response.product,
      });
  } catch (e) {
    return res.status(500).json({
      mes: e.mes,
    });
  }
};

module.exports = { createProduct, getProducts };
