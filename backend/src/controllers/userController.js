const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('103164851235-suior8k6dm4u6nhfud1en503v9i8kf5s.apps.googleusercontent.com');
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

  static googleLogin(req, res) {
    const authUrl = client.generateAuthUrl({
      scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/userinfo.email'],
    });
    res.redirect(authUrl);
  }

  static async googleLoginCallback(req, res) {
    const { code } = req.query;

    try {
      // Trocar o código de autorização por um token de acesso
      const { tokens } = await client.getToken({
        code,
      });

      // Obter informações do usuário usando o token de acesso
      const googleUser = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: '103164851235-suior8k6dm4u6nhfud1en503v9i8kf5s.apps.googleusercontent.com', // Substitua 'SEU_CLIENT_ID' pelo seu ID de cliente OAuth do Google
      });

      // Encontrar ou criar o usuário com base nas informações do Google
      let user = await User.findOne({ email: googleUser.payload.email });

      if (!user) {
        // criar um novo usuário caso não exista
        user = new User({
          nome: googleUser.given_name,
          sobrenome: googleUser.family_name,
          email: googleUser.email,
        });

        // Salvar o novo usuário
        await user.save();
      }

      // Gerar token JWT para o usuário
      await createUserToken(user, req, res);

      window.location.href = "../meu-portfolio/meu-portfolio.html"; // vai para a página de portfólio 
      // Redirecionar ou enviar o token para o cliente conforme necessário
      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao lidar com o callback do Google:', error);
      res.status(500).json({ message: 'Erro interno ao fazer login com o Google' });
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
