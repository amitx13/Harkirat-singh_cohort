import { NextFunction, Request, Response } from "express";
import { httpRequestDurationMicroseconds, requestCounter } from "./requestCount";
import { activeRequestGauge } from "./activeRequest";

export const cleanupMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestGauge.inc();

    res.on('finish', function() {
        
        const endTime = Date.now();
        console.log(`latency ${endTime - startTime} ms`);
        
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime
        )
        activeRequestGauge.dec() 

    });
    next()
}