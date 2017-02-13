const { hash, compare } = require('bcrypt');

const saltHashPassword = (password) => {
  return hash(password, 5);
}

const confirmPassword = (password, hash) => {
  return compare(password, hash);
}

module.exports = {
  saltHashPassword,
  confirmPassword
}
