const express = require('express')

const {
    createNew,
    getAll,
    getOne,
    deleteOne,
    updateOne
} = require('../controllers/reqController')


const router = express.Router()
// GET all 
router.get('/', getAll)

router.get('/:id', getOne)

router.post('/', createNew)

router.delete('/:id', deleteOne)

router.patch('/:id', updateOne)

module.exports = router