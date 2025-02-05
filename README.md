# Generate Self Signed SSL Certificate:

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

# Read docs:
https://www.npmjs.com/package/ws