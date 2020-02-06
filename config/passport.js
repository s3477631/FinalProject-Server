const passport = require("passport");
const UserModel = require("../database/models/users_model")
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

//serializes the user 
passport.serializeUser((user, done) => {
    done(null, user._id);
});

//deserializes the user and then searches for a student
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy({
        usernameField: "email",
        session: false
    },
    async (email, password, done) => {
        const user = await UserModel.findOne({ email })
            .catch(done);

        return done(null, user);
    }
));

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        const user = await UserModel.findById(jwt_payload.sub)
            .catch(done);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }
));

module.exports = passport;