const initialRouter = (app) => {
  return app.use("/", (req, res) => {
    return res.send("Server on");
  });
};
module.exports = initialRouter;
