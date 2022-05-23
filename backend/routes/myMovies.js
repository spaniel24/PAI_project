const express = require('express')
const router = express.Router()
const sqlite = require('sqlite3')
const VHSDb = new sqlite.Database('./database/VHS.db')

router.get('/', (req, res, next) => {
    if (req.user) {
        VHSDb.all(`select * from movies where rentedTo = ${req.user.id}`, (err, results) => {
            res.status(200).json(results)
        });
    } else {
        res.status(403).send({msg: 'Not authenticated'})
    }
})

module.exports = router;