import './App.css'
import io from "socket.io-client"

const socket = io('http://localhost:3001/');


function App() {
  return (
    <div className="App">
      <h1>Hello world!</h1>
    </div>
  )
}

export default App
