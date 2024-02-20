const user = require("./user");
const initialRouter = (app) => {
  app.use("/api/v1/user", user);
  app.use("/", (req, res) => {
    return res.send("Server on");
  });
};
module.exports = initialRouter;
