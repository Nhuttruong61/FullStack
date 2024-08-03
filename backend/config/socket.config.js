const { Server } = require("socket.io");


const socketIo = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL,
        },
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
}

module.exports = socketIo