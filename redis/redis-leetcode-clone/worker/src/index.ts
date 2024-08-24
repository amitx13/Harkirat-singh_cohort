import { createClient } from "redis"

const client = createClient();

const processSubimission = async (submission:string) => {
    try{
        const {problem, id, code, language} = JSON.parse(submission)
        console.log(`Processing submission for problem ${problem} by user ${id} in ${language}...`)
        console.log(`Code: ${code}`);

        // Implement your code evaluation logic here. For example, you might want to
        // run the code in a sandboxed environment and return the results to the user.

        await new Promise((resolve) => setTimeout(resolve, 3000))
        console.log(`Finished processing submission for problemId ${problem}.`);
    }
    catch(error){
        console.error("Error processing submission:", error);
        // Implement your error handling logic here. For example, you might want to push
        // the submission back onto the queue or log the error to a file.
    }
}

const startWorker = async () => {
    try{
        await client.connect()
        console.log("connected to redis...")

        while(true){
            try{
                const submission = await client.brPop("submissions", 0)
                // @ts-ignore
                await processSubimission(submission.element)
            }
            catch(error){
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    }catch(error){
        console.error("Error connecting to Redis:", error);
    }
}

startWorker()