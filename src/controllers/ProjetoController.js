const Projeto = require("../models/Projeto")

module.exports = class ProjetoController{

    //create a project
    static async create(req, res) {
        res.json({ message: 'Projeto adicionado!'})
    }

}

