const Projeto = require("../models/projeto");
const user = require("../models/user");

const getUserByToken = require("../util/get-user-by-token");
const getToken = require("../util/get-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class projetoController {
  static async create(req, res) {
    const { titulo, tags, link, descricao } = req.body;
    const imagem = req.files;

    if (!titulo) {
      res.status(422).json({ message: "O titulo é obrigatório!" });
      return;
    }

    if (!tags) {
      res.status(422).json({ message: "As tags são obrigatórias!" });
      return;
    }

    if (!link) {
      res.status(422).json({ message: "O link é obrigatório!" });
      return;
    }

    if (!descricao) {
      res.status(422).json({ message: "A descrição é obrigatória!" });
      return;
    }

    if (!imagem) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const projeto = new Projeto({
      titulo,
      tags: tags.split(" "),
      link,
      descricao,
      imagem: [],
      user: {
        _id: user._id,
        nome: user.nome,
        sobrenome: user.sobrenome,
      },
    });

    imagem?.map((image) => {
      projeto.imagem.push(image.filename);
    });

    try {
      const newProjeto = await projeto.save();
      res.status(201).json({
        message: "Projeto cadastrado com sucesso!",
        newProjeto,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAllProjetos(req, res) {
    const projeto = await Projeto.find().sort("-createdAt");

    res.status(200).json({
      projeto,
    });
  }

  static async getAllUserProjetos(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const projeto = await Projeto.find({ "user._id": user._id }).sort(
      "-createdAt"
    );

    res.status(200).json({
      projeto,
    });
  }

  static async getProjetoById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const projeto = await Projeto.findOne({ _id: id });

    if (!projeto) {
      res.status(404).json({ message: "Projeto não encontrado!" });
      return;
    }

    res.status(200).json({
      projeto: projeto,
    });
  }

  static async getProjetosByTags(req, res) {
    try {
      const { tags } = req.query;

      if (!tags) {
        return res.status(400).json({ message: "Tags inválidas!" });
      }

      const tagsArray = tags.split(",");

      const projetos = await Projeto.find({ tags: { $in: tagsArray } });

      res.status(200).json({ projetos });
    } catch (error) {
      console.error("Erro ao buscar projetos por tags:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async removeProjetoById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    const projeto = await Projeto.findOne({ _id: id });

    if (!projeto) {
      res.status(404).json({ message: "Projeto não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (projeto.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em acessar sua solitação" });
      return;
    }

    await Projeto.findByIdAndDelete(id);

    res.status(200).json({ message: "Projeto removido com sucesso!" });
  }

  static async updateProjeto(req, res) {
    const id = req.params.id;

    const { titulo, tags, link, descricao } = req.body;
    const imagem = req.files;

    const updateData = {};

    const projeto = await Projeto.findOne({ _id: id });

    if (!projeto) {
      res.status(404).json({ message: "Projeto não encontrado!" });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (projeto.user._id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em acessar sua solitação" });
      return;
    }

    if (!titulo) {
      res.status(422).json({ message: "O titulo é obrigatório!" });
      return;
    } else {
      updateData.titulo = titulo;
    }

    if (!tags) {
      res.status(422).json({ message: "As tags são obrigatórias!" });
      return;
    } else {
      updateData.tags = tags;
    }

    if (!link) {
      res.status(422).json({ message: "O link é obrigatório!" });
      return;
    } else {
      updateData.link = link;
    }

    if (!descricao) {
      res.status(422).json({ message: "A descrição é obrigatória!" });
      return;
    } else {
      updateData.descricao = descricao;
    }

    if (!imagem) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
      return;
    }

    updateData.imagem = [];
    imagem?.map((image) => {
      updateData.imagem.push(image.filename);
    });

    await Projeto.findByIdAndUpdate(id, updateData);

    res.status(200).json({ message: "Projeto atualizado com sucesso!" });
  }
};
