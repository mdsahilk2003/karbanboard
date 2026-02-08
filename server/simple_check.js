console.log("Starting simple check...");
try {
    require('dotenv').config();
    console.log("Dotenv loaded. URI:", process.env.MONGO_URI ? "Found" : "Missing");

    const mongoose = require('mongoose');
    console.log("Mongoose loaded");

    const uri = process.env.MONGO_URI;
    console.log("Connecting to:", uri);

    mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
        .then(() => {
            console.log("Connected successfully!");
            process.exit(0);
        })
        .catch(err => {
            console.error("Connection failed:", err.message);
            process.exit(1);
        });
} catch (e) {
    console.error("Crash:", e);
}
