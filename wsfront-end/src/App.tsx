import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState<string[]>([''])
  const [webSocket, setWebSocket] = useState<null | WebSocket>(null)

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080")
    ws.onopen=()=>{
      console.log('connected to wsServer')
      setWebSocket(ws)
    }
    ws.onmessage = (msg) =>{
      setMessage((prev)=>{
        return [...prev,msg.data]
      })
    }
    return ()=>{
      ws.close()
    }
  },[])

  if(!webSocket){
    return <div>Connecting to webSocket Server...</div>
  }

  return (
    <>
    <button onClick={()=>{
      webSocket.send("hello mf")
    }}> send</button>
    <>{message}</>
    </>
  )
}

export default App
