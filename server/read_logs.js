const fs = require('fs');

try {
    if (fs.existsSync('server_err.txt')) {
        console.log('--- server_err.txt ---');
        console.log(fs.readFileSync('server_err.txt', 'utf8'));
    } else {
        console.log('server_err.txt not found');
    }

    if (fs.existsSync('server_5001.log')) {
        console.log('--- server_5001.log ---');
        console.log(fs.readFileSync('server_5001.log', 'utf8'));
    } else {
        console.log('server_5001.log not found');
    }
} catch (e) {
    console.error('Error reading logs:', e);
}
