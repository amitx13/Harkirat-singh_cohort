
import './App.css';
import {useState,useEffect}from 'react'
import io from "socket.io-client"
import {nanoid} from "nanoid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" />
        <button type="submit">send</button>
      </header>
    </div>
  );
}

export default App;
