const express = require('express')
const router = express.Router()
const sqlite = require('sqlite3')
const luxon = require("luxon");
const VHSDb = new sqlite.Database('./database/VHS.db')

router.get('/', (req, res, next) => {
    VHSDb.all('select * from movies where rentedTo IS NULL', (err, results) => {
        res.json(results)
    });
})

router.patch('/', (req, res, next) => {
    if (req.user) {
        const date = luxon.DateTime.now().plus({ days: 8 }).toISO()
        VHSDb.run(`UPDATE movies set rentedTo = ${req.user.id}, returnDate = '${date}' WHERE id = ${req.body.id}`)
        res.status(200).send({msg: 'ok'})
    } else {
        res.status(403).send({msg: 'Not authenticated'})
    }
})

router.patch('/returnAll', (req, res, next) => {
    VHSDb.run(`UPDATE movies set rentedTo = NULL, returnDate = NULL`)
    res.status(200).send({msg: 'ok'})
})

router.patch('/return/:id', (req, res, next) => {
    VHSDb.run(`UPDATE movies set rentedTo = NULL, returnDate = NULL WHERE id = ${req.params.id}`)
    res.status(200).send({msg: 'ok'})
})

module.exports = router;


// const date = luxon.DateTime.now().plus({ days: 8 }).toISO()
// if (req.user) {
//     VHSDb.run(`UPDATE movies set rentedTo = ${req.user.id} WHERE id = ${req.body.id}`)
//     VHSDb.run(`UPDATE movies set returnDate = ${date} WHERE id = ${req.body.id}`)
//     res.status(200).send({msg: 'ok'})
// } else {
//     res.status(403).send({msg: 'Not authenticated'})
// }