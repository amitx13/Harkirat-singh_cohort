import client from "prom-client";

// Create a counter metric
export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames:['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 500]
})