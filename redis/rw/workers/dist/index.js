"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function processSubmission(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // const {problemId, code, language} = JSON.parse(data)
        console.log("Processing submission", typeof (data), JSON.parse(data));
        // await new Promise((resolve) => { setTimeout(resolve, 3000) })
        const pub = yield client.publish("results", JSON.stringify({ result: "Accepted" }));
        console.log("Published to results", pub);
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis");
            while (true) {
                try {
                    const data = yield client.brPop("problems", 0);
                    console.log("Received data from Redis", data);
                    //@ts-ignore
                    processSubmission(data.element);
                }
                catch (err) {
                    // Implement your error handling logic here. For example, you might want to push
                    // the submission back onto the queue or log the error to a file.
                    console.log('Error in fetching data from redis : ', err);
                }
            }
        }
        catch (err) {
            console.error("Failed to connect to Redis", err);
        }
    });
}
startWorker();
