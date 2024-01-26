const router = require('express').Router()

const projetoController = require('../controllers/ProjetoController.js')

//middlewares
const { imageUpload } = require('../util/image-upload')

router.post('/create', imageUpload.array('imagem'),projetoController.create)

module.exports = router