//Manejo de servidor
import express from "express";
import morgan from "morgan";
import http from "http";
import cors from "cors";
//Conexion a traves de socket
import { Server as SocketServer } from "socket.io";
//Dotenv
import * as dotenv from "dotenv";
dotenv.config();

//manipulacion/generacion de el servidor
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

//configuracion del puerto
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log(`User Conected.
  id: ${socket.id}`);

  socket.on("message", (message) => {
    // console.log(`user: ${socket.id} \t message: ${message}`)
    console.log(`message: ${message}`);
    socket.broadcast.emit("message", {
      body:message,
      from:socket.id   
    }); //atrapa y emite los mensajes a todos los usuarios
  });
});

server.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}/`);
});
