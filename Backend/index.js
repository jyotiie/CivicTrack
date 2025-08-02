import { connectToDatabase } from './DB/connectDB.js';
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// Database connection function


// Start server and connect to database
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});