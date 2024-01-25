const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

async function registerUser(req, res) {
  try {
    const { name, surname, password, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ error: 'Email already registered' });
    }

    if (!name || name.trim() === '') {
      return res.status(400).send({ error: 'Name cannot be empty' });
    }

    if (password.length < 8) {
      return res.status(400).send({ error: 'Password must be at least 8 characters long' });
    }

    const user = await User.create({
      name,
      surname,
      password,
      email,
    });

    user.password = undefined;

    const token = generateToken({ id: user.id });

    return res.send({
      user,
      token,
    });
  } catch (err) {
    console.error(err);  // Loga o erro no console para investigação
    return res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
}

module.exports = {registerUser,};
