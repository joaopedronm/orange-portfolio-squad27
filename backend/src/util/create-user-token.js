const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign({
      nome: user.nome,
      id: user._id,
    }, "nossosecret"
  )

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
  });
};

module.exports = createUserToken