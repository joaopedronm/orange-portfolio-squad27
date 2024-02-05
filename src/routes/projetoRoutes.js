const router = require('express').Router()
const projetoController = require("../controllers/projetoController")

const verifyToken = require('../util/check-token')
const { imageUpload } = require('../util/image-upload')

router.post('/create', verifyToken, imageUpload.array('imagem'), projetoController.create)
router.get('/descobrir', verifyToken, projetoController.getAllProjetos)
router.get('/meusprojetos', verifyToken, projetoController.getAllUserProjetos)
router.get('/:id', verifyToken, projetoController.getProjetoById)
router.get('/', verifyToken, projetoController.getProjetosByTags)
router.delete('/:id', verifyToken, projetoController.removeProjetoById)
router.patch('/:id', verifyToken, imageUpload.array('imagem'), projetoController.updateProjeto)

module.exports = router