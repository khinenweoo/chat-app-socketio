import { Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId} in this format, userId will be coming from the database

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    // if userid existed, we can update usersocketmap
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    // listen disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        // delete this key from the usersocketmap
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));

    });
});

export { io, app, server };