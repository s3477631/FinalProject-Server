const JWT = require("jsonwebtoken")

function generateToken(user){ 
    const token = JWT.sign(
        {
            email: user.email
        }, 
        process.env.JWT_SECRET, 
        { 
            subject: user._id.toString()
        }
    )
    return token
}

module.exports = { 
    generateToken
}