import { Socket } from "socket.io";

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const PORT = 8000;

// Connect with client
io.on("connection", (socket: Socket) => {
  console.log("Connecting with client");

  // receive from client
  socket.on("send_message", (data: string) => {
    console.log(data);

    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect with client");
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));