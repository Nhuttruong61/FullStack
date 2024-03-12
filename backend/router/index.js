const category = require("./category");
const user = require("./user");
const slider = require("./slider");
const product = require("./product");
const order = require("./order");

const initialRouter = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/category", category);
  app.use("/api/v1/product", product);
  app.use("/api/v1/slider", slider);
  app.use("/api/v1/order", order);
  app.use("/", (req, res) => {
    return res.send("Server on");
  });
};
module.exports = initialRouter;
