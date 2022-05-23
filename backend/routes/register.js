const express = require('express')
const sqlite = require("sqlite3");
const router = express.Router()
const VHSDb = new sqlite.Database('./database/VHS.db')

router.post('/', (req,res,next)=>{
    VHSDb.run(`INSERT INTO users(username, password) VALUES(?, ?)`, [req.body.username, req.body.password])
    res.status(200).json({status: 200})
})
module.exports = router;