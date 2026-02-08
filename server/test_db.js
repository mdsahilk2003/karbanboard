const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

// More detailed logging with standard output to bypass buffering
process.stdout.write(`Attempting to connect to: ${uri}\n`);

async function testConnection() {
    try {
        // 30 second timeout per docs
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        process.stdout.write('SUCCESS: Connected to MongoDB!\n');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        process.stdout.write('FAILURE: Could not connect to MongoDB.\n');
        process.stdout.write(`Error name: ${error.name}\n`);
        process.stdout.write(`Error message: ${error.message}\n`);
        // Check specific error codes
        if (error.codeName === 'AtlasError') {
            process.stdout.write('HINT: This might be an IP whitelist issue on MongoDB Atlas.\n');
        }
        process.exit(1);
    }
}

testConnection();
