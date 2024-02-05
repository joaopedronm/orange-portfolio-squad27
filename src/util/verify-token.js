const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Acesso Negado!' })
    }

    const token = getToken(req)

    if(!token) {
        return res.status(401).json({ message: 'Acesso Negado!'})
    }

    try {

        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()

    }catch (err) {
        return res.status(400).json({ message: 'Token inválido!' })
        
    }
}

module.exports = checkToken

//utilizado apenas no editar usuario