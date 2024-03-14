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
router.put(
  "/update-user/:id",
  validateDto(
    Joi.object({
      name: stringReq,
      phone: stringReq,
      address: stringReq,
    })
  ),
  verifyToken,
  userController.updateUser
);

router.delete(
  "/delete/:id",
  verifyToken,
  isAdmin,
  userController.deleteleteUser
);
router.patch("/add-card/:id", verifyToken, userController.addProductCart);
router.patch("/remove-card/:id", verifyToken, userController.removeProductCart);

module.exports = router;
