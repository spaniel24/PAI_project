const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/', passport.authenticate('local'), (req, res)=>{
    res.send(200)
})

module.exports = router;