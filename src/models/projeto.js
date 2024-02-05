const mongoose = require('mongoose')
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
        /* Array de string para separar as tags por palavras */
        type: [String],
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
        type: Array,
        required: true,
      },
      user: Object,
    },
    { timestamps: true }
  ),
)

module.exports = Projeto