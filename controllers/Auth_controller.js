const UserModel = require("../database/models/users_model")
const JWTService = require("../services/jwt_service")
const jwt = require('jsonwebtoken');

//Route is for admin only 
async function register(req, res, next) {
        const { email, password } = req.body;
        const user = await UserModel.create({ email, password });
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.send("you are authenticated!")
        });
    }

// login sends JWT's back to 
async function login(req, res, next){ 
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.json(token);
}

module.exports = {
    register,
    login
}