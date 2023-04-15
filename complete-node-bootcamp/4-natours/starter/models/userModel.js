const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    require: [true, 'Please tell us your name'],
    trim: true,
    maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    minlength: [10, 'A tour name must have more or equal then 10 characters'],
  },
  email: {
    type: 'string',
    require: [true, 'Please tell us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, ' please provide a valid email'],
  },
  photo: {
    type: 'string',
  },
  password: {
    type: 'string',
    require: [true, 'Please tell us your password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: 'string',
    require: [true, 'Please tell us your passwordConfirm'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
