const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  surname: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  Email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('User', UserSchema);