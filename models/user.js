const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  isAdmin:   { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;