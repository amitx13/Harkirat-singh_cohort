import express, { Request, Response } from 'express'
import { createClient } from 'redis'
const app = express()
const client = createClient()

app.use(express.json())

client.on('error',(err)=>{
    console.log('Error in redis : ',err)
})

app.post("/submit",async(req:Request,res:Response)=>{
    const {problemId, code, language} = req.body

    if(!problemId || !code || !language){
        res.status(400).json({message:'Invalid request'})
        return
    }

    try{
        await client.lPush("problems",JSON.stringify({problemId,code,language}))
        //store in the database
        res.status(200).json({message:'Code submitted successfully'})
    }catch(err){
        res.status(500).json({message:'Internal server error'})
        return
    }
})

async function startServer(){
    try {
        await client.connect()
        console.log("Connected to Redis");

        app.listen(3000,()=>{
            console.log('Server is running on port 3000')
        })

    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer()