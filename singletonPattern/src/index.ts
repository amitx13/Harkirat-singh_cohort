import { games } from "./store";
import { startLogger } from "./logger";

startLogger()
startGame()
function startGame(){
    setInterval(()=>{
        games.push({
            id: Math.random().toString(),
            blackPlayer: "nigga",
            whitePlayer: "honky",
            moves: []
        })
    },3000)
}