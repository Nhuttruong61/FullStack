const router = require("express").Router();
const Joi = require("joi");
const productController = require("../controller/product");
const validateDto = require("../middleware/validate");
const { stringReq, arrayReq, numberReq } = require("../middleware/JoiSheme");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post(
  "/creare-product",
  validateDto(
    Joi.object({
      name: stringReq,
      category: stringReq,
      image: arrayReq,
      des: stringReq,
      price: numberReq,
      discount: numberReq,
      quality: numberReq,
    })
  ),
  verifyToken,
  isAdmin,
  productController.createProduct
);
router.get("/get-products", productController.getProducts);
// router.put(
//   "/update-product/:id",
//   validateDto(
//     Joi.object({
//       name: stringReq,
//       image: stringReq,
//     })
//   ),
//   verifyToken,
//   isAdmin,
//   productController.updateCategory
// );
// router.delete(
//   "/delete-product/:id",
//   verifyToken,
//   isAdmin,
//   productController.deleteCategory
// );
module.exports = router;
