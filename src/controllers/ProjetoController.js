const Projeto = require("../models/projeto")


module.exports = class projetoController{

    //create a project
    static async create(req, res) {

        const {titulo, tags, link, descricao} = req.body

        const imagem = req.files
        const available = true

        //imagens upload

        //validations
        if(!titulo) {
            res.status(422).json({message: "O titulo é obrigatório!"})
            return
        }

        if(!tags) {
            res.status(422).json({message: "As tags são obrigatórias!"})
            return
        }

        if(!link) {
            res.status(422).json({message: "O link é obrigatório!"})
            return
        }

        if(!descricao) {
            res.status(422).json({message: "A descrição é obrigatória!"})
            return
        }

        if(!imagem) {
            res.status(422).json({message: "A imagem é obrigatória!"})
            return
        }

        //create a project
        const projeto = new Projeto({
            titulo,
            tags,
            link,
            descricao,
            imagem: [],
        })

        imagem.map((image) => {
            projeto.imagem.push(image.filename)
        })

        try {

            const newProjeto = await projeto.save()
            res.status(201).json({
              message: "Projeto cadastrado com sucesso!",
              newProjeto,
            })

        }catch(error) {
            res.status(500).json({message: error})

        }

    }

}

