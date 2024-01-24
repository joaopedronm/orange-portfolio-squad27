const router = require('express').Router()

const ProjetoController = require('../controllers/ProjetoController.js')

router.post('/create', ProjetoController.create)

module.exports = router