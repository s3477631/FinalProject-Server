const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate")
const passport = require('passport')
const AuthController = require("../controllers/Auth_controller")

router.post("/register", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}), AuthController.register)

router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
    }), passport.authenticate('local', {
    failureRedirect: '/login',
    session: false
}), AuthController.login);

module.exports = router