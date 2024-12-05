"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeRequestGauge = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.activeRequestGauge = new prom_client_1.default.Gauge({
    name: 'active_request_gauge',
    help: 'Number of active requests'
});
