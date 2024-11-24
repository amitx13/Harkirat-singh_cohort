import { createClient, RedisClientType } from "redis"

export class PubSubManager {

    private subscriptions: Map<string, string[]>

    private redisClient: RedisClientType

    private static instance:PubSubManager

    private constructor() {
        this.redisClient = createClient()
        this.redisClient.connect()
        this.subscriptions = new Map()
        // private constructor
    }

    public static getInstance(): PubSubManager {
        if (!PubSubManager.instance){
            PubSubManager.instance = new PubSubManager()
        }
        return PubSubManager.instance
    }

    public addUserToStock(userId:string, stockTicker:string): void {
        if (!this.subscriptions.has(stockTicker)){
            this.subscriptions.set(stockTicker, [])
        }

        this.subscriptions.get(stockTicker)?.push(userId)

        if(this.subscriptions.get(stockTicker)?.length === 1){
            this.redisClient.subscribe(stockTicker,(msg)=>{
                this.handleMessage(stockTicker, msg)
            })
        }
    }

    public removeUserFromStock(userId:string, stockTicker:string): void {
        this.subscriptions.set(stockTicker,this.subscriptions.get(stockTicker)?.filter((sub)=>sub !== userId)||[])

        if(this.subscriptions.get(stockTicker)?.length === 0){
            this.redisClient.unsubscribe(stockTicker)
            console.log(`UnSubscribed to Redis channel: ${stockTicker}`);
        }
    }

    // Define the method that will be called when a message is published to the subscribed channel
    private handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }

}
