import { useEffect, useState } from 'react';

const App = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<string[]>([])
    const [webSocket, setWebSocket] = useState<null | WebSocket>(null)
  
    useEffect(()=>{
      const ws = new WebSocket("ws://localhost:3000")
      ws.onopen=()=>{
        console.log('connected to wsServer')
        setWebSocket(ws)
      }
      ws.onmessage = (msg) =>{
        console.log('message',msg)
        const data = JSON.parse(msg.data);
        setMessages((prev) => [...prev, data.message]);
      }
      return ()=>{
        ws.close()
      }
    },[])
  
    if(!webSocket){
      return <div>Connecting to webSocket Server...</div>
    }

    // Send message to server
    const sendMessage = () => {
        if (input && webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(input);
            setInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>WebSocket Client</h2>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h4>Messages:</h4>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
