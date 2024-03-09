const router = require("express").Router();
const Joi = require("joi");
const userController = require("../controller/user");
const validateDto = require("../middleware/validate");
const { stringReq } = require("../middleware/JoiSheme");
const { verifyToken, isAdmin, checkToken } = require("../middleware/auth");
router.post(
  "/register",
  validateDto(
    Joi.object({
      name: stringReq,
      email: stringReq,
      password: stringReq,
    })
  ),
  userController.rerister
);
router.post(
  "/login",
  validateDto(
    Joi.object({
      email: stringReq,
      password: stringReq,
    })
  ),
  userController.login
);
router.get("/get-user-token", verifyToken, userController.getUserToken);
router.get("/get-users", verifyToken, isAdmin, userController.getUsers);
router.get("/refesToken", checkToken, userController.refesToken);
router.put("/add-card", verifyToken, userController.addProductCard);
router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  userController.deleteleteUser
);

module.exports = router;
