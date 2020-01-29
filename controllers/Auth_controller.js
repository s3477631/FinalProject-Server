const UserModel = require("../database/models/users_model")
const JWTService = require("../services/jwt_service")

function register(req, res, next){ 
    const {username, password} = req.body
    const user = new UserModel({username});

    UserModel.register(user, password, (err, user) => { 
        if (err) { 
            return next(new HTTPError(500, err.message))
        }
        const token = JWTService.generateToken(user)
        return res.json({token})
    })
}

module.exports = {
    register
}