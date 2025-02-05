# Ví dụ về SSL với Websocket & TCP
```bash
npm run ws # Chạy server websocket & test bằng ./__tests__/websocket.test.ts
npm run tcp # Chạy server tcp & test bằng ./__tests__/tcp.test.ts
```

# Generate Self Signed SSL Certificate:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

# Read docs:
https://www.npmjs.com/package/ws