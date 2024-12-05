"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupMiddleware = void 0;
const requestCount_1 = require("./requestCount");
const activeRequest_1 = require("./activeRequest");
const cleanupMiddleware = (req, res, next) => {
    const startTime = Date.now();
    activeRequest_1.activeRequestGauge.inc();
    res.on('finish', function () {
        const endTime = Date.now();
        console.log(`latency ${endTime - startTime} ms`);
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        requestCount_1.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime);
        activeRequest_1.activeRequestGauge.dec();
    });
    next();
};
exports.cleanupMiddleware = cleanupMiddleware;
