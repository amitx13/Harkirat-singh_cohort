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
const processSubimission = (submission) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { problem, id, code, language } = JSON.parse(submission);
        console.log(`Processing submission for problem ${problem} by user ${id} in ${language}...`);
        console.log(`Code: ${code}`);
        // Implement your code evaluation logic here. For example, you might want to
        // run the code in a sandboxed environment and return the results to the user.
        yield new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(`Finished processing submission for problemId ${problem}.`);
    }
    catch (error) {
        console.error("Error processing submission:", error);
        // Implement your error handling logic here. For example, you might want to push
        // the submission back onto the queue or log the error to a file.
    }
});
const startWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("connected to redis...");
        while (true) {
            try {
                const submission = yield client.brPop("submissions", 0);
                // @ts-ignore
                yield processSubimission(submission.element);
            }
            catch (error) {
                console.error("Error processing submission:", error);
                // Implement your error handling logic here. For example, you might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    }
    catch (error) {
        console.error("Error connecting to Redis:", error);
    }
});
startWorker();
