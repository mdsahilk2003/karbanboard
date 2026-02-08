require('dotenv').config();
console.log(`MONGO_URI from env: ${process.env.MONGO_URI}`);
if (process.env.MONGO_URI.startsWith('"') || process.env.MONGO_URI.startsWith("'")) {
    console.log('WARNING: MONGO_URI has leading quotes!');
}
