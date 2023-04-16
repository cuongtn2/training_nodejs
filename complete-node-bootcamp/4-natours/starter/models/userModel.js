const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    select: false,
  },
  passwordConfirm: {
    type: 'string',
    require: [true, 'Please tell us your passwordConfirm'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passwordConfirm dont match your password',
    },
  },
  passwordChangeAt: Date,
});

userSchema.pre('save', async function (next) {
  //only run this function if password wwas actually modified
  if (!this.isModified('password')) return next();
  //has the password wwith cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
  if (this.passwordChangeAt) {
    console.log('123', changedTimestamp, JWTTimestamp);
    // so sánh thời gian hiệu lực của token  < thời gian đổi pass
    // thì là đúng => nick đã được đổi pass token hết hiệu lực
    // thời gian đổi pass < thời gian của token => token còn hiệu lực
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
