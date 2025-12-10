const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  email: { type: String },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Helper to compare password
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('users', userSchema);
module.exports = User;
