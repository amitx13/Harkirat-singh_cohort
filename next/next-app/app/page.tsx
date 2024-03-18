import axios from "axios";

const getUserData = async () => {
  await new Promise((r) => setTimeout(r, 1500));
  const response = await axios.get("http://localhost:3000/api/user")
  //wrong approach becz when user send nextjs server a request the nextjs server again sending a request to it's own  
  //server by api and the sending back the response 
  return response.data
}
export default async function Home() {
  const userData = await getUserData();
  return (
    <div className="text-center">
      <div>
        {userData?.email}
      </div>
      <div>
        {userData?.name}
      </div>
    </div>
  );
}
