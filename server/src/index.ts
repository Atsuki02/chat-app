import { Socket } from "socket.io";

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 8000;

// Connect with client
io.on("connection", (socket: Socket) => {
  console.log("Connecting with client");

  socket.on("disconnect", () => {
    console.log("disconnect with client");
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
