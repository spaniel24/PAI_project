const LocalStrategy = require('passport-local')
const e = require("express");


function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, {message: 'No user with that username'})
        }

        if (password === user.password) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'Password incorrect'})
        }
    }
    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize