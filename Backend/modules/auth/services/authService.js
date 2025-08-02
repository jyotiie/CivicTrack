"use strict";

const logging                         = require('../../../logging/logging');
const User = require('../models/user'); 
const passwordUtils = require("../../../services/pwdService");
const jwtUtility = require("../../../services/jwtService");
const redisLib = require("../../../database/redislib");

exports.login = async(apiReference, opts)=>{
    logging.log(apiReference, { EVENT: "login called", opts });
    try {
        // Simulate login logic
        const user = await User.findOne({ email: opts.email });
        if (!user) {
            return { success: false, error: "User not found" };
        }
        if( !passwordUtils.compare(opts.password, user.password)) {
            return { success: false, error: "Invalid password" };
        }

        let token = jwtUtility.createJWT(apiReference, { user_id: user._id, email: user.email, role: user.role }, "30 days");
        delete user.password; // Remove password from user object before sending response


        redisLib.addToken(apiReference, { key: user._id.toString(), 'access-token': token });
        return { success: true, data: { user, token } };
    } catch (error) {
        logging.logError(apiReference, { EVENT: "login error", ERROR: error, STACK: error.STACK });
        return { success: false, error: "Internal server error" };
    }
}


exports.register = async(apiReference, opts)=>{
    logging.log(apiReference, { EVENT: "register called", opts });
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: opts.email });
        if (existingUser) {
            return { success: false, error: "User already exists" };
        }

        let hashedPassword = passwordUtils.encrypt(opts.password);
        // Create new user
        const user = new User({
            username: opts.username,
            email: opts.email,
            password: hashedPassword // Make sure to hash the password in your model's pre-save hook
        });

        await user.save();

        return { success: true, data: user };
    } catch (error) {
        logging.logError(apiReference, { EVENT: "register error", ERROR: error, STACK: error.STACK });
        return { success: false, error: "Internal server error" };
    }
}