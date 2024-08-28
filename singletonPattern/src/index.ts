import { GameManager } from "./store";
import { startLogger } from "./logger";

startLogger()
startGame()
function startGame(){
    setInterval(()=>{
        GameManager.getInstance().addGame(Math.random().toString())
    },5000)
}