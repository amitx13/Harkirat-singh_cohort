import { BrowserRouter,Routes , Route, Link } from "react-router-dom"
import Landing from "./components/Landing"
import { Suspense, lazy , useContext} from "react"
const Dashboard = lazy(()=>import("./components/Dashboard"))
import UserContext from "./components/utils/UserContext"


const App = () => {
  return (
 <>
 <UserContext.Provider value={"amit"}>
  <BrowserRouter>
  <Appbar/>
  <Routes>
    <Route path = "/" element = {<Landing/>}></Route>
    <Route path = "/dashboard" element = {<Suspense fallback={"loading..."}><Dashboard/></Suspense>}></Route>
  </Routes>
  </BrowserRouter>
  </UserContext.Provider>
   </>
  )
}

const Appbar = ()=>{
    const user1 ="xlr8";
    const user = useContext(UserContext);
    return(
    <div>
        <h1>{user1}</h1>
        <h1>{user}</h1>
    <Link to="/"><button>Landing</button></Link>
    <Link to = "/dashboard"><button>Dashboard</button></Link>
   </div>
    )
}
export default App