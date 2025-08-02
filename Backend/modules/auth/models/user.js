const mongoose = require('mongoose');

'use strict';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String,  default: 'user' }
});

module.exports = mongoose.model('User', userSchema);