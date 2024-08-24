import express from 'express'
import { createClient } from 'redis'

const client  = createClient()
const app = express()
app.use(express.json())

app.post("/submit",async(req,res)=>{
    
    const {problem, id, code, language} = req.body

    try{
        await client.lPush("submissions", JSON.stringify({problem, id, code, language}))
        //store in the database
        res.status(200).json({status:"Code submitted successfully"})
    }
    catch(error){
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
})

const startServer = async () => {
    try{
        await client.connect()
        console.log("Connected to Redis...")
        app.listen(3000, () =>{
            console.log("listening to the server...")
        })
    }
    catch{
        console.log("Error connecting to Redis...")
    }
}

startServer()