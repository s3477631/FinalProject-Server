const UserModel = require("../database/models/users_model")
const JWTService = require("../services/jwt_service")
const jwt = require('jsonwebtoken');
function register(req, res, next){ 
    const {email, password} = req.body
    
    const user = new UserModel({email});

    UserModel.register(user, password, (err, user) => { 
        if (err) { 
                if(err.name == "UserExistsError"){ 
                    console.log({email})
                    res.end()
                }
                
        }
        const token = JWTService.generateToken(user)
        return res.json({token})
    })
}

async function login(req, res, next){ 
    let {email, password} = req.body

    // console.log(usermod.find({email}))
    UserModel.find({ email }, function (err, users) {
        if (err) { console.log(err) };
        if (!users.length) { //do stuff here 
           res.send("you are not authenticated!")
           res.end()
        }
        else {
            let token = jwt.sign({email}, 
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h'
                }
                )
            res.json({ 
                success: true,
                token
            })
        }
    })
}



module.exports = {
    register,
    login
}