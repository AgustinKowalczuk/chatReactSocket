import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:3001/");

function App() {
  const [message, setMessage] = useState("");
  const [messages,setMessages] = useState([{
    body:"message test",
    from: "user1"
  }]);


  useEffect(() => {
    const receiveMessage = message =>{
      // console.log(message)
      setMessages([...messages,message])
    }
    socket.on("message", receiveMessage); //escucha del evento 
    
    return ()=>{
      socket.off("message", receiveMessage); //desuscribe el evento
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage('')
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message}/>
        <button>send</button>
      </form>
      {
      messages.map(message =>(
      <div>
        <p>{message.from}:{message.body}</p>
      </div>
      ))}
    </div>
  );
}

export default App;
