const socketIo = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://full-stack-five-theta.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello socket");
});
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("addproduct", (data) => {
    console.log("Broadcasting update:", data);
    io.emit("getproduct", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT || 8000}`);
});
