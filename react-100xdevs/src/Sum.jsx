import { useEffect, useMemo, useState } from "react"

const Sum = () => {
    const [count,setCount] = useState(0);
    const [sumvalue,setSumValue] = useState(0);
 /*    const [finalval, setFinalval]= useState(0);

    useEffect(()=>{
      console.log("hello useEffect")
      let s = 0;
    for(let i=0;i<=sumvalue;i++){
        s=s+i;
    }
    setFinalval(s);
    },[sumvalue]) */

    console.log("render()")


    const finalCount = useMemo(()=>{
      console.log("hello memo")
      let s = 0;
      for(let i=0;i<=sumvalue;i++){
        s=s+i;
      }
      return s;
    },[sumvalue])



  return (
    <>
    <input type="text" onChange={(e)=>{setSumValue(e.target.value)}}/>
    <div>sum is :{/* finalval */ finalCount}</div>
    <button onClick={()=>{setCount(count+1)}}>count {count}</button>
    </>
  )
}  
export default Sum
