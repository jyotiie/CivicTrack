"use strict";

const authValidator = require('./validators/authValidator');
const authController = require("./controllers/authController")
const authConstants = require('./constants/authConstants');

router.post("/auth/register",authValidator.register, authController.register);
router.post("/auth/login",  authValidator.login, authController.login); 