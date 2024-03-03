const express = require("express");
const cors = require("cors");
const initialRouter = require("./router");
const DataBaseConnect = require("./config/mongoConnect");
var cookieParser = require("cookie-parser");
const CloudinaryConnect = require("./config/cloudinaryConnect");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initialRouter(app);
const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log("listening on port " + process.env.PORT);
});
CloudinaryConnect();
DataBaseConnect();
