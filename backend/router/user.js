const router = require("express").Router();
const Joi = require("joi");
const userController = require("../controller/user");
const validateDto = require("../middleware/validate");
const { stringReq } = require("../middleware/JoiSheme");
const { verifyToken, isAdmin } = require("../middleware/auth");
router.post(
  "/register",
  validateDto(
    Joi.object({
      email: stringReq,
      password: stringReq,
      role: stringReq,
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
router.get("/get-users", verifyToken, isAdmin, userController.getUsers);

module.exports = router;
