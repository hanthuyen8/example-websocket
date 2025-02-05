import {describe, test} from "vitest";
import WebSocket from 'ws';

describe("Websocket", () => {
    test("unsecure", async () => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.on('error', console.error);

        ws.on('open', function open() {
            ws.send('send unsecure message');
        });

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        await sleep(1000);

        /**
         * Để filter trên Wireshark: websocket || tcp.port == 8080
         */
    });

    test("secure", async () => {
        const ws = new WebSocket('wss://localhost:8443', {rejectUnauthorized: false});
        ws.on('error', console.error);

        ws.on('open', function open() {
            ws.send('send secure message');
        });

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        await sleep(1000);

        /**
         * Để filter trên Wireshark: tls && tcp.port == 8443
         */
    });

    test("wrong connection 1", async () => {
        const ws = new WebSocket('ws://localhost:8443', {rejectUnauthorized: false});
        ws.on('error', console.error);

        ws.on('open', function open() {
            ws.send('send wrong connection message');
        });

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        await sleep(1000);
    });

    test("wrong connection 2", async () => {
        const ws = new WebSocket('wss://localhost:8080', {rejectUnauthorized: false});
        ws.on('error', console.error);

        ws.on('open', function open() {
            ws.send('send wrong connection message');
        });

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        await sleep(1000);
    });

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}