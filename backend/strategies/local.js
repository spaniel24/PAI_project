const LocalStrategy = require('passport-local')
const passport = require('passport')
const sqlite = require("sqlite3");
const e = require("express");
const VHSDb = new sqlite.Database('./database/VHS.db')

passport.serializeUser((user, done)=>{
    done(null, user.username)
});

passport.deserializeUser((username, done)=>{
    VHSDb.all('select * from users', (err, results) => {
        const queriedUser = results.find(someUser => {
            return someUser.username === username
        })
        if (queriedUser) {
            done(null, queriedUser)
        }
    });
});

passport.use(new LocalStrategy(
    (username, password, done) => {


        VHSDb.all('select * from users', (err, results) => {
            const queriedUser = results.find(someUser => {
                return someUser.username === username
            })
            if (!queriedUser) {
                done(null, false)
            } else {
                if (queriedUser.password === password) {
                    done(null, queriedUser)
                } else {
                    done(null, false)
                }
            }
        });
    }
))