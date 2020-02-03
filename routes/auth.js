const express = require("express");
const router = express.Router();
const { celebrate, Joi } = require("celebrate")
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
}), AuthController.login)


module.exports = router