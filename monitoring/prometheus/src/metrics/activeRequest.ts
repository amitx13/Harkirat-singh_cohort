import client from "prom-client"

export const activeRequestGauge = new client.Gauge({
    name: 'active_request_gauge',
    help: 'Number of active requests'
})