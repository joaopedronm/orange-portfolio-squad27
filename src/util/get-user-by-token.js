const jwt = require("jsonwebtoken");

const User = require("../models/user");

// get user by jwt token
const getUserByToken = async (token) => {
  // find user
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;