import { createClient } from "redis";

const client = createClient();

async function processSubmission(data: string) {
    // const {problemId, code, language} = JSON.parse(data)
    console.log("Processing submission", typeof(data) , JSON.parse(data))
    // await new Promise((resolve) => { setTimeout(resolve, 3000) })
    const pub = await client.publish("results", JSON.stringify({result: "Accepted"}))
    console.log("Published to results", pub)
}

async function startWorker(){
    try{
        await client.connect()
        console.log("Connected to Redis")

        while(true){
            try{
                const data = await client.brPop("problems",0)
                console.log("Received data from Redis", data)
                //@ts-ignore
                processSubmission(data.element)
            }catch(err){
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
                console.log('Error in fetching data from redis : ',err)
            }

        }
    }catch(err){
        console.error("Failed to connect to Redis", err);
    }
}

startWorker()