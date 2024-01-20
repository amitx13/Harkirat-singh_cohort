import { useState,memo } from 'react'

function App() {
  const [count, setCount] = useState(0)
  return (
  <div>
    <ButtonComponent count={count} setCount={setCount}></ButtonComponent>
    <Header title={count}></Header>
    <Header title={"hola"}/>
    <Header title={"hola"}/>
    <Header title={"hola"}/>
  </div>
  )
}
const Header = memo(function Header({title}){//when a parent component rerender it trigger all children to re-render and memo prevent that  - memo only rerender when the component has a dynamic component irrespective of it's parent render
  return <>
  <div>{title}</div></>
});
function ButtonComponent({count,setCount}){
  function onClickHandler(){
    setCount(count+1);
  }
  return <button onClick={onClickHandler}>hello{count}</button>
}
export default App
