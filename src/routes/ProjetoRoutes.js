const router = require('express').Router()

const projetoController = require('../controllers/projetoController.js')

router.post('/create', projetoController.create)

module.exports = router