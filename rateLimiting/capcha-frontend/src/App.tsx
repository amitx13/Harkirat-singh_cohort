import { useState } from 'react'
import axios from 'axios'
import { Turnstile } from '@marsidev/react-turnstile'

import './App.css'

function App() {
  const [token, setToken] = useState<string>()

  return (
    <>
    {token}
    <input type="text" placeholder='otp' />
    <input type="text" placeholder='new password' />
    <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAiLvqxiTDFs6xGF' />
    <button onClick={async()=>{
      const res = await axios.post('http://localhost:3000/reset-password', {
        email:"test@gmail.com",
        otp: "355070",
        newPassword: "newPassword",
        token: token
      })
      console.log("res",res)
    }}>submit</button>
    </>
  )
}

export default App
