const express = require("express");
const cors = require("cors");
const initialRouter = require("./router");
const DataBaseConnect = require("./config/mongoConnect");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initialRouter(app);
const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log("listening on port " + process.env.PORT);
});
DataBaseConnect();
