const http = require('http');
const fs = require('fs');

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/tasks',
    method: 'GET',
};

const req = http.request(options, (res) => {
    fs.writeFileSync('verify_result.txt', `STATUS: ${res.statusCode}\n`);
    res.on('data', (d) => {
        fs.appendFileSync('verify_result.txt', `DATA: ${d}\n`);
    });
});

req.on('error', (e) => {
    fs.writeFileSync('verify_result.txt', `ERROR: ${e.message}\n`);
});

req.end();
