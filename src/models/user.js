const mongoose = require('mongoose');
const { Schema } = mongoose

const User = mongoose.model(
  "User",
  new Schema(
    {
      nome: {
        type: String,
        required: true,
      },
      sobrenome: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;
