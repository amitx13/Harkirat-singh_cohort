import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import user from "./store/atoms/countRecoil"
import userid from "./store/selectors/Idselector"
const App = () => {
    const [count , setCount] = useState(0)
    const [username , setUserName] = useRecoilState(user)
    const uid = useRecoilValue(userid)
  return (
    <div>
        <h1>{username.name}</h1>
        <h1>{uid}</h1>
        <button onClick={()=>setCount(count+1)}>Click-me : {count}</button>
        <input type="text" onChange={(e)=>setUserName({...username , name:e.target.value})} />
    </div>
  )
}
export default App