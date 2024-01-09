import { useState,memo } from "react"

const Todo = () => {
    const [isclick , setIsClick]= useState(false);
    const [addtitle , setTitle]= useState("");
    const [adddescription , setDescription]= useState("");
    const [arr,setArr] = useState([
        {
            key:1,
            title:"react1",
            description:"jldi krr1"
        },
        {
            key:2,
            title:"react2",
            description:"jldi krr2"
        },
        {
            key:3,
            title:"react13",
            description:"jldi krr3"
        }
    ]);

    function handleClick(){
        setArr([...arr,{ key: arr.length + 1, title: addtitle, description: adddescription }]);
        setTitle("");
        setDescription("");
    }
  return (
    <>
    {isclick?<input type="text" placeholder="title" onChange={(e)=>{setTitle(e.target.value)}}/>:null}
    {isclick?<input type="text" placeholder="description" onChange={(e)=>{setDescription(e.target.value)}} />:null}
    <button onClick={()=>{handleClick();setIsClick(true)}}>Add todo</button>
    {arr.map((todo)=>{
        return <Todorender key={todo.key} todo={todo}/>
    })}
    </>
  )
}

function Todorender({todo}){
return <>
<h1>{todo.title}</h1>
<h4>{todo.description}</h4>
</>
}

export default Todo