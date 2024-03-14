const express = require("express");
const cors = require("cors");
const initialRouter = require("./router");
const DataBaseConnect = require("./config/mongoConnect");
var cookieParser = require("cookie-parser");
const CloudinaryConnect = require("./config/cloudinaryConnect");
const connect = require("./config/redisConnect");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
initialRouter(app);
const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log("listening on port " + process.env.PORT);
});
CloudinaryConnect();
DataBaseConnect();
