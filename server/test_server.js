const http = require('http');

// Correct request body
const data = JSON.stringify({
    title: 'Test Task via Script',
    status: 'Todo',
    order: 0
});

const req = http.request({
    hostname: 'localhost',
    port: 5000,
    path: '/tasks',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response Body: ${body}`);
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
