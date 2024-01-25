const projeto = require("../models/projeto")

module.exports = class projetoController{

    //create a project
    static async create(req, res) {
        res.json({ message: 'Projeto adicionado!'})
    }

}

