import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from 'http'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()


const app = express();
const server = http.createServer(app)
const io = new SocketServer(server,{
  cors:{
    origin: '*'
  }
})

const PORT= process.env.PORT || 8080

app.use(cors());
app.use(morgan("dev"));

io.on('connection',(socket)=>{
  console.log(`User Conected.
  id: ${socket.id}`)
  console.log(`Un usuario se conecto`)
})

server.listen(PORT, () => {
  console.log(`Server on port http://localhost:${PORT}/`); 
});
