const router = require('express').Router()

const ProjetoController = require('../controllers/projetoController.js')

router.post('/create', ProjetoController.create)

module.exports = router