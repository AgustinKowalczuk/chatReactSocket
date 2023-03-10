import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:3000/");

function App() {
  const [message, setMessage] = useState(""); //Texto de mensaje
  const [messages, setMessages] = useState([]); //Mensajes guardados {body:"el mensaje",from:id de la conexion}

  useEffect(() => {
    const receiveMessage = (message) => {
      // console.log(message)
      setMessages([message, ...messages]);
    };
    socket.on("message", receiveMessage); //escucha del evento

    return () => {
      socket.off("message", receiveMessage); //desuscribe el evento
    };
  }, [messages]); // Escuchando la modificacion de Mensajes

  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>send</button>
      </form>
      {messages.map((message, i) => (
        <p key={i}>
          {message.from}:{message.body}
        </p>
      ))}
    </div>
  );
}

export default App;
