"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
class PubSubManager {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
        // private constructor
    }
    static getInstance() {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }
    addUserToStock(userId, stockTicker) {
        var _a, _b;
        if (!this.subscriptions.has(stockTicker)) {
            this.subscriptions.set(stockTicker, []);
        }
        (_a = this.subscriptions.get(stockTicker)) === null || _a === void 0 ? void 0 : _a.push(userId);
        if (((_b = this.subscriptions.get(stockTicker)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.redisClient.subscribe(stockTicker, (msg) => {
                this.handleMessage(stockTicker, msg);
            });
        }
    }
    removeUserFromStock(userId, stockTicker) {
        var _a, _b;
        this.subscriptions.set(stockTicker, ((_a = this.subscriptions.get(stockTicker)) === null || _a === void 0 ? void 0 : _a.filter((sub) => sub !== userId)) || []);
        if (((_b = this.subscriptions.get(stockTicker)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            this.redisClient.unsubscribe(stockTicker);
            console.log(`UnSubscribed to Redis channel: ${stockTicker}`);
        }
    }
    // Define the method that will be called when a message is published to the subscribed channel
    handleMessage(stock, message) {
        var _a;
        console.log(`Message received on channel ${stock}: ${message}`);
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }
}
exports.PubSubManager = PubSubManager;
