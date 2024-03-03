const category = require("./category");
const user = require("./user");
const initialRouter = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/category", category);
  app.use("/", (req, res) => {
    return res.send("Server on");
  });
};
module.exports = initialRouter;
