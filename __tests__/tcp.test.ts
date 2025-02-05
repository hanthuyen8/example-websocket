import {describe, test} from "vitest";
import net from 'net';
import tls from 'tls';

describe("tcp", () => {
    test("unsecure", async () => {
        const client = net.createConnection({port: 9000}, () => {
            console.log('Connected to server');
            client.write('Hello from unsecure client!');
        });

        client.on('data', (data) => {
            console.log('Received:', data.toString());
            client.end();
        });

        client.on('end', () => console.log('Disconnected from server'));

        await sleep(1000);

        /**
         * Để filter trên Wireshark: tcp.len > 0 && tcp.port == 9000
         */
    });

    test("secure", async () => {
        const client = tls.connect(9001, 'localhost', {rejectUnauthorized: false}, () => {
            console.log('Connected to server');
            client.write('Hello from secure client!');
        });

        client.on('data', (data) => {
            console.log('Received:', data.toString());
            client.end();
        });

        client.on('end', () => console.log('Disconnected from server'));

        await sleep(1000);

        /**
         * Để filter trên Wireshark: tls && tcp.port == 9001
         */
    });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}