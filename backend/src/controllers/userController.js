const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//const getUserByToken = require("../util/get-user-by-token");
const getToken = require("../util/get-token");
const createUserToken = require("../util/create-user-token");

module.exports = class userController {
  static async register(req, res) {
    const { nome, sobrenome, email, password, confirmpassword } = req.body;

    if (!nome) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!sobrenome) {
      res.status(422).json({ message: "O sobrenome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação precisam ser iguais!" });
      return;
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      nome,
      sobrenome,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  //login
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email) {
        res.status(422).json({ message: "O e-mail é obrigatório!" });
        return;
      }

      if (!password) {
        res.status(422).json({ message: "A senha é obrigatória!" });
        return;
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(422)
          .json({ message: "Não há usuário cadastrado com este e-mail!" });
      }

      if (!user.password) {
        console.log("Senha do usuário não encontrada");
        return res
          .status(500)
          .json({ message: "Senha do usuário não encontrada!" });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida" });
      }

      await createUserToken(user, req, res);
    } catch (error) {
      console.error("Erro ao fazer o login:", error);
      res.status(500).json({ message: "Erro interno ao fazer login" });
    }
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  }
};
