const mongoose = require('../db/conn')
const { Schema } = mongoose

const Projeto = mongoose.model(
  "Projeto",
  new Schema(
    {
      titulo: {
        type: String,
        required: true,
      },
      tags: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      descricao: {
        type: String,
        required: true,
      },
      imagem: {
        type: String,
      },
    },
    { timestamps: true }
  ),
)

module.exports = Projeto